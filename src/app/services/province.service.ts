import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {
  constructor(private http: HttpClient) { }

    getProvinces(): Observable<any> {
        return this.http.get<any>('https://apis.datos.gob.ar/georef/api/provincias');
    }
}
