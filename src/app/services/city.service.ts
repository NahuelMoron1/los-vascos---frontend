import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {
    constructor(private http: HttpClient) { }

    getCities(province: string | null, city: string): Observable<any> {
        return this.http.get<any>(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${province}&nombre=${city}`);
    }
}
