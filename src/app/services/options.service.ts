import { inject, Injectable } from '@angular/core';
import { Options } from '../models/Options';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class OptionsService {
  private myAppUrl: string;
  private myApiUrl: string;
  options: Options[] = [];
  _options: BehaviorSubject<Options[]> = new BehaviorSubject<Options[]>([]);
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/options/';
  }
  async readProductOptions(productID: string) {
    let featuresAux = await this.getProductOptionsTC(productID);
    if (featuresAux) {
      this.options = featuresAux;
      this._options.next(this.options);
      this.decodeOptions();
    }
    return this._options.asObservable();
  }
  decodeOptions() {
    for (let i = 0; i < this.options.length; i++) {
      this.options[i].name = decodeURIComponent(this.options[i].name);
    }
    this._options.next(this.options);
  }
  async getProductOptionsTC(productID: string) {
    try {
      const data = await this.getProductOptions(productID).toPromise();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }
  async returnProductByName(id: string) {
    let prodAux = await this.getProductOptionsByNameTC(id);
    if (prodAux) {
      prodAux.name = decodeURIComponent(prodAux.name);
      return prodAux;
    } else {
      return null;
    }
  }
  async getProductOptionsByNameTC(id: string) {
    try {
      const data = await this.getOption(id).toPromise();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }
  deleteOneOption(featureID: string) {
    this.deleteOption(featureID).subscribe(() => {});
    let index = this.searchOptionIndex(featureID);
    if (index >= 0) {
      this.options.splice(index, 1);
      this._options.next(this.options);
    }
  }
  searchOptionIndex(optionID: string) {
    let i = 0;
    let access = false;
    while (i < this.options.length && !access) {
      if (this.options[i].id == optionID) {
        access = true;
      } else {
        i++;
      }
    }
    if (access) {
      return i;
    } else {
      return -1;
    }
  }
  createOption(featureAux: Options) {
    this.saveOptions(featureAux).subscribe(() => {});
    this.options.unshift(featureAux);
    this._options.next(this.options);
  }
  async updateOneOption(index: number, featureAux: Options, oldID: string) {
    featureAux.name = encodeURIComponent(featureAux.name);
    try {
      await this.updateOptions(featureAux, oldID).toPromise();
      this.options[index] = featureAux;
      this._options.next(this.options);
    } catch (error) {
      console.log(error);
    }
  }
  getOptions(): Observable<Options[]> {
    return this.http.get<Options[]>(this.myAppUrl + this.myApiUrl, {
      withCredentials: true,
    });
  }
  getOption(id: string): Observable<Options> {
    return this.http.get<Options>(this.myAppUrl + this.myApiUrl + id);
  }
  getProductOptions(productID: string): Observable<Options[]> {
    let urlAux = this.myAppUrl + this.myApiUrl + 'product/';
    return this.http.get<Options[]>(urlAux + productID);
  }
  getProductOptionsByTwo(
    productID: string,
    optionName: string
  ): Observable<Options> {
    optionName = encodeURIComponent(optionName);
    let urlAux = this.myAppUrl + this.myApiUrl + 'product/option/';
    return this.http.get<Options>(
      urlAux + productID + '/' + encodeURIComponent(optionName)
    );
  }

  async getProductOptionByNameTC(name: string, productid: string) {
    try {
      const data = await this.getProductOptionByName(
        name,
        productid
      ).toPromise();
      return data;
    } catch (error: any) {
      ErrorService.handleError(error);
      return;
    }
  }

  getProductOptionByName(name: string, productid: string): Observable<Options> {
    let urlAux = this.myAppUrl + this.myApiUrl + 'name/';
    return this.http.get<Options>(urlAux + name + '/' + productid);
  }

  deleteOptionByProduct(id: string): Observable<void> {
    let apiUrl = this.myAppUrl + this.myApiUrl + 'deleteProduct/' + id;
    return this.http.delete<void>(apiUrl, { withCredentials: true });
  }

  deleteOption(id: string): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, {
      withCredentials: true,
    });
  }
  deleteOptions(): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}`, {
      withCredentials: true,
    });
  }
  saveOptions(productAux: Options): Observable<void> {
    productAux.name = encodeURIComponent(productAux.name);
    return this.http.post<void>(
      `${this.myAppUrl}${this.myApiUrl}`,
      productAux,
      { withCredentials: true }
    );
  }
  updateOptions(productAux: Options, oldID: string): Observable<void> {
    return this.http.patch<void>(
      `${this.myAppUrl}${this.myApiUrl}${oldID}`,
      productAux
    );
  }
}
