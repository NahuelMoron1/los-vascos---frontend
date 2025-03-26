import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  private myAppUrl: string;
  private myApiUrl: string;
  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/Voucher/'
  }

  getVoucher(){
    return this.http.get<any>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  saveVoucher(formData: FormData): Observable<any>{
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}`, formData);
  }
}
