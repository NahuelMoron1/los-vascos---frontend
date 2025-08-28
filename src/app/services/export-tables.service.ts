import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExportTablesService {
  private myAppUrl: string;
  private myApiUrl: string;
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/exportTables/';
  }

  exportTablesFunction(type: string): Observable<string> {
    if (type.length > 0) {
      return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}${type}`, {
        withCredentials: true,
      });
    } else {
      return of('');
    }
  }
}
