import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Subcategory } from '../models/Subcategory';

@Injectable({
  providedIn: 'root',
})
export class SubcategoryService {
  private myAppUrl: string;
  private myApiUrl: string;
  subcategories: Subcategory[] = [];
  _subcategories: BehaviorSubject<Subcategory[]> = new BehaviorSubject<
    Subcategory[]
  >(this.subcategories);
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/subcategories/';
  }
  returnSubcategories() {
    return this._subcategories.asObservable();
  }
  async readSubcategories(categoryID: string) {
    let categoriesAux = await this.getSubcategoriesTC(categoryID);
    if (categoriesAux) {
      this.subcategories = categoriesAux;
      this._subcategories.next(this.subcategories);
    }
    return this._subcategories.asObservable();
  }
  async getSubcategoriesTC(categoryID: string) {
    try {
      const data = await this.getSubcategoriesByCategory(
        categoryID
      ).toPromise();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error;
    }
  }
  async readSubcategory(id: string) {
    const categoryAux = await this.getOneCategory(id);
    if (categoryAux) {
      return categoryAux;
    }
    return;
  }
  async getOneCategory(id: string) {
    try {
      const data = await this.getSubcategory(id).toPromise();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      return;
    }
  }
  getSubcategories(): Observable<Subcategory[]> {
    return this.http.get<Subcategory[]>(this.myAppUrl + this.myApiUrl);
  }
  getSubcategory(id: string): Observable<Subcategory> {
    return this.http.get<Subcategory>(this.myAppUrl + this.myApiUrl + id);
  }
  getSubcategoriesByCategory(categoryID: string): Observable<Subcategory[]> {
    return this.http.get<Subcategory[]>(
      this.myAppUrl + this.myApiUrl + 'category/' + categoryID
    );
  }
  deleteSubcategory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, {
      withCredentials: true,
    });
  }
  deleteSubcategories(): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}`, {
      withCredentials: true,
    });
  }
  deleteSubcategoryByName(subcategoryName: string): Observable<void> {
    const url: string =
      this.myAppUrl + this.myApiUrl + 'name/' + subcategoryName;
    return this.http.delete<void>(url, {
      withCredentials: true,
    });
  }
  saveSubcategory(categoryAux: Subcategory): Observable<void> {
    return this.http.post<void>(
      `${this.myAppUrl}${this.myApiUrl}`,
      categoryAux,
      {
        withCredentials: true,
      }
    );
  }
  updateSubcategory(id: string, productAux: Subcategory): Observable<void> {
    return this.http.patch<void>(
      `${this.myAppUrl}${this.myApiUrl}${id}`,
      productAux
    );
  }
}
