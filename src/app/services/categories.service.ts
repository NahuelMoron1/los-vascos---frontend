import { Injectable } from '@angular/core';
import { Category } from '../models/Category';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private myAppUrl: string;
  private myApiUrl: string;
  categories: Category[] = [];
  categorySelected: string = '';
  _categorySelected: BehaviorSubject<string> = new BehaviorSubject<string>(
    this.categorySelected
  );
  _categories: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>(
    this.categories
  );
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/Categories/';
  }
  changeSelected(category: string) {
    this.categorySelected = category;
    this._categorySelected.next(this.categorySelected);
  }
  returnSelected() {
    return this._categorySelected.asObservable();
  }
  returnCategories() {
    return this._categories.asObservable();
  }
  async readCategories() {
    let categoriesAux = await this.getCategoriesTC();
    if (categoriesAux) {
      this.categories = categoriesAux;
      this._categories.next(this.categories);
    }
    return this._categories.asObservable();
  }
  async getCategoriesTC() {
    try {
      const data = await this.getCategories().toPromise();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error;
    }
  }
  async readCategory(id: string) {
    const categoryAux = await this.getOneCategory(id);
    if (categoryAux) {
      return categoryAux;
    }
    return;
  }
  async getOneCategory(id: string) {
    try {
      const data = await this.getCategory(id).toPromise();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      return;
    }
  }
  async readCategoryByName(name: string) {
    const categoryAux = await this.getOneCategoryByName(name);
    if (categoryAux) {
      return categoryAux;
    }
    return;
  }
  async getOneCategoryByName(name: string) {
    try {
      const data = await this.getCategoryByName(name).toPromise();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      return;
    }
  }
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.myAppUrl + this.myApiUrl);
  }
  getCategory(id: string): Observable<Category> {
    return this.http.get<Category>(this.myAppUrl + this.myApiUrl + id);
  }
  getCategoryByName(name: string): Observable<Category> {
    return this.http.get<Category>(
      this.myAppUrl + this.myApiUrl + 'name/' + name
    );
  }
  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, {
      withCredentials: true,
    });
  }
  deleteCategories(): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}`, {
      withCredentials: true,
    });
  }
  saveCategory(categoryAux: Category): Observable<void> {
    const formData = new FormData();
    if (categoryAux.temporaryFile) {
      formData.append('file', categoryAux.temporaryFile);
    }
    formData.append('category', JSON.stringify(categoryAux));
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, formData, {
      withCredentials: true,
    });
  }
  updateCategory(id: string, productAux: Category): Observable<void> {
    return this.http.patch<void>(
      `${this.myAppUrl}${this.myApiUrl}${id}`,
      productAux
    );
  }
}
