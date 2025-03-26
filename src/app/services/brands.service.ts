import { Injectable } from '@angular/core';
import { Brand } from '../models/Brand';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  private myAppUrl: string;
  private myApiUrl: string;
  brandsArray: Array<Brand> = [];
  _brandsArray: BehaviorSubject<Brand[]> = new BehaviorSubject<Brand[]>(
    this.brandsArray
  );
  brandSelected: string = 'all';
  _brandSelected: BehaviorSubject<string> = new BehaviorSubject<string>(
    this.brandSelected
  );
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/brands/';
  }

  async readBrands() {
    const brandsAux = await this.setBrands();
    if (brandsAux != undefined) {
      this.brandsArray = [];
      for (let i = 0; i < brandsAux.length; i++) {
        this.brandsArray.push(brandsAux[i]);
      }
      this._brandsArray.next(this.brandsArray);
    }
    return this._brandsArray.asObservable();
  }

  changeSelected(brand: string) {
    this.brandSelected = brand;
    this._brandSelected.next(this.brandSelected);
    return this._brandSelected.asObservable();
  }

  getBrandSelected() {
    return this._brandSelected.asObservable();
  }

  async setBrands() {
    try {
      const data = await this.getBrands().toPromise();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }

  async setOneBrand(id: string) {
    try {
      const data = await this.getBrand(id).toPromise();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      return;
    }
  }

  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.myAppUrl + this.myApiUrl);
  }
  getBrand(id: string): Observable<Brand> {
    return this.http.get<Brand>(this.myAppUrl + this.myApiUrl + id);
  }
  deleteBrand(id: string): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, {
      withCredentials: true,
    });
  }
  deleteBrands(): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}`, {
      withCredentials: true,
    });
  }
  saveBrand(productAux: Brand): Observable<void> {
    const formData = new FormData();
    if (productAux.temporaryFile) {
      formData.append('file', productAux.temporaryFile);
    }
    formData.append('brand', JSON.stringify(productAux));
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, formData, {
      withCredentials: true,
    });
  }
  updateBrand(id: string, productAux: Brand): Observable<void> {
    return this.http.patch<void>(
      `${this.myAppUrl}${this.myApiUrl}${id}`,
      productAux
    );
  }
}
