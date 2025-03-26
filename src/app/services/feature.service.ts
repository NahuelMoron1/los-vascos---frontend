import { Injectable } from '@angular/core';
import { Feature } from '../models/Feature';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {
  private myAppUrl: string;
  private myApiUrl: string;
  features: Feature[] = [];
  _features: BehaviorSubject<Feature[]> = new BehaviorSubject<Feature[]>([]);
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/Features/'
  }
  async readProductFeatures(productID: string) {
    let featuresAux = await this.getProductFeaturesTC(productID);
    if (featuresAux) {
      this.features = featuresAux;
      this._features.next(this.features);
    }
    return this._features.asObservable();
  }
  async getProductFeaturesTC(productID: string) {
    try {
      const data = await this.getProductFeatures(productID).toPromise();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }
  deleteOneFeature(featureID: string, index: number) {
    this.deleteFeature(featureID).subscribe(() => { });
    this.features.splice(index, 1);
    this._features.next(this.features);
  }
  createFeature(featureAux: Feature) {
    this.saveFeature(featureAux).subscribe(() => { });
    this.features.unshift(featureAux);
    this._features.next(this.features);
  }
  updateOneFeature(index: number, featureAux: Feature) {
    this.updateFeature(featureAux.id, featureAux).subscribe(() => { });
    this.features[index] = featureAux;
    this._features.next(this.features);
  }
  getFeatures(): Observable<Feature[]> {
    return this.http.get<Feature[]>(this.myAppUrl + this.myApiUrl, { withCredentials: true });
  }
  getFeature(id: string): Observable<Feature> {
    return this.http.get<Feature>(this.myAppUrl + this.myApiUrl + id);
  }
  getProductFeatures(productID: string): Observable<Feature[]> {
    let urlAux = this.myAppUrl + this.myApiUrl + 'product/'
    return this.http.get<Feature[]>(urlAux + productID);

  }
  deleteFeature(id: string): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, { withCredentials: true });
  }
  deleteFeatures(): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}`, { withCredentials: true });
  }
  saveFeature(productAux: Feature): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, productAux, { withCredentials: true });
  }
  updateFeature(id: string, productAux: Feature): Observable<void> {
    return this.http.patch<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, productAux);
  }
}
