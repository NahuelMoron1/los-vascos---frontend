import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Product } from '../models/Product';
import { BehaviorSubject, Observable } from 'rxjs';
import { OptionsService } from './options.service';
import { Options } from '../models/Options';
import { BrandsService } from './brands.service';
import { CategoriesService } from './categories.service';
import { CookieService } from './cookie.service';
import { PublicUser } from '../models/PublicUser';
import { ErrorService } from './error.service';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private myAppUrl: string;
  private myApiUrl: string;
  optionService = inject(OptionsService);
  brandService = inject(BrandsService);
  categoryService = inject(CategoriesService);
  categorySelected: string = '';
  brandSelected: string = 'all';
  pageNumber: number = 1;
  pageTotal: number = 0;
  _pageNumber: BehaviorSubject<number> = new BehaviorSubject<number>(
    this.pageNumber
  );
  _pageTotal: BehaviorSubject<number> = new BehaviorSubject<number>(
    this.pageTotal
  );
  cookieService = inject(CookieService);

  options: Options[] = [];
  products: Array<Product> = [];
  _products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  user: PublicUser = new PublicUser('', '', '', false);
  loading: boolean = false;
  _loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    this.loading
  );
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/Products/';
  }
  returnObservable() {
    return this._products.asObservable();
  }
  changeLoading(name: string) {
    if (name == 'false') {
      this.loading = false;
    } else {
      this.loading = true;
    }
    this._loading.next(this.loading);
    return this._loading.asObservable();
  }
  getDiscounts(productAux: Product) {
    if (productAux.discount != 0) {
      productAux.priceDiscount =
        productAux.price - (productAux.price * productAux.discount) / 100;
    }
    return productAux.priceDiscount;
  }
  async readProducts(type: string, value: string | null) {
    (await this.cookieService.getUser()).subscribe((data) => {
      this.user = data;
    });
    let productsAux;
    this.products = [];
    switch (type) {
      case 'brand':
        if (value != null) {
          productsAux = await this.getByBrands(value);
        }
        break;
      case 'category':
        if (value != null) {
          productsAux = await this.getByCategory(value);
        }
        break;
      case 'search':
        if (value) {
          productsAux = await this.searchProducts(value);
        }
        break;
      case 'rand':
        productsAux = await this.getRand();
        break;
      default:
        productsAux = await this.setProducts(this.pageNumber);
        break;
    }
    if (productsAux != undefined) {
      this.options = [];
      for (let i = 0; i < productsAux.length; i++) {
        productsAux[i] = await this.setOptionPrice(productsAux[i]);
        this.products.push(productsAux[i]);
      }
      this._products.next(this.products);
      this.hasCostPrice();
    }
    return this._products.asObservable();
  }

  async readBrandsCategorySubcategory(
    type: string,
    category: string | null,
    subcategory: string | null,
    brand: string | null
  ) {
    this.products = [];
    let productsAux: Product[] | undefined;
    switch (type) {
      case 'brand-category':
        if (brand && category) {
          productsAux = await this.getByBrandCategory(brand, category);
        }
        break;
      case 'subcategory':
        if (category && subcategory) {
          productsAux = await this.getByCategorySubcategory(
            category,
            subcategory
          );
        }
        break;
      case 'brand-subcategory':
        if (brand && category && subcategory) {
          productsAux = await this.getByBrandCategorySubcategory(
            brand,
            category,
            subcategory
          );
        }
        break;
    }
    if (productsAux != undefined) {
      this.options = [];
      for (let i = 0; i < productsAux.length; i++) {
        productsAux[i] = await this.setOptionPrice(productsAux[i]);
        this.products.push(productsAux[i]);
      }
      this._products.next(this.products);
      this.hasCostPrice();
    }
    return this._products.asObservable();
  }

  async setOptionPrice(productAux: Product) {
    (await this.optionService.readProductOptions(productAux.id)).subscribe(
      (products) => {
        this.options = products;
      }
    );
    if (this.options.length > 0) {
      productAux.optionSelected = this.options[0].name;
      productAux.price = this.options[0].price;
    }
    productAux.priceDiscount = this.getDiscounts(productAux);
    return productAux;
  }

  async getByBrandCategorySubcategory(
    brand: string,
    category: string,
    subcategory: string
  ) {
    try {
      const data = await this.getProductsByBrandCategorySubcategory(
        brand,
        category,
        subcategory
      ).toPromise();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }

  async getByCategorySubcategory(category: string, subcategory: string) {
    try {
      const data = await this.getProductsByCategorySubcategory(
        category,
        subcategory
      ).toPromise();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }

  async getByBrandCategory(brand: string, category: string) {
    try {
      const data = await this.getProductsByBrandCategory(
        brand,
        category
      ).toPromise();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }

  async getByCategory(category: string) {
    try {
      const data = await this.getProductsByCategory(category).toPromise();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }

  async getByBrands(brand: string) {
    try {
      const data = await this.getProductsByBrand(brand).toPromise();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }

  async getRand() {
    try {
      const data = await this.getRandomProducts().toPromise();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }

  async setProducts(page: number): Promise<Product[] | undefined> {
    try {
      const data = await this.getProducts(page).toPromise();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }

  async searchProducts(name: string) {
    try {
      this.brandService.getBrandSelected().subscribe((brandAux) => {
        this.brandSelected = brandAux;
      });
      this.categoryService.returnSelected().subscribe((category) => {
        this.categorySelected = category;
      });
      const data = await this.getProductSearch(name).toPromise();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }

  async returnOneProduct(id: string) {
    let productAux = await this.getOneProduct(id);
    let productReturn: Product = new Product(
      '',
      '',
      '',
      '',
      0,
      '',
      0,
      '',
      0,
      0
    );
    if (productAux != undefined) {
      productReturn = productAux;
      productReturn = await this.setOptionPrice(productReturn);
    }
    return productReturn;
  }
  setPageNumber(page: number) {
    this.pageNumber = page;
    this._pageNumber.next(this.pageNumber);
  }
  getCurrentPage() {
    return this._pageNumber.asObservable();
  }

  async getOneProduct(id: string) {
    try {
      const data = await this.getProduct(id).toPromise();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }

  async productExistsTC(product: Product) {
    try {
      const data = await this.productExists(product).toPromise();
      return data;
    } catch (error: any) {
      return ErrorService.handleError(error);
    }
  }

  async readCounts(value: string, type: string) {
    let countedAux = await this.countProductsTC(value, type);
    if (countedAux) {
      this.pageTotal = countedAux;
      this._pageTotal.next(this.pageTotal);
    }
    return this._pageTotal.asObservable();
  }

  async countProductsTC(value: string, type: string) {
    try {
      const data = await this.countProducts(value, type).toPromise();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }
  hasCostPrice() {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].price < 2) {
        //alert(this.products[i].name);
        //this.products.splice(i, 1);
      }
    }
    this._products.next(this.products);
  }

  getProducts(page: number): Observable<Product[]> {
    return this.http.get<Product[]>(
      this.myAppUrl + this.myApiUrl + 'page/' + page
    );
  }

  countProducts(value: string, type: string): Observable<number> {
    return this.http.get<number>(
      this.myAppUrl + this.myApiUrl + 'count/' + value + '/' + type
    );
  }

  getRandomProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.myAppUrl + this.myApiUrl + 'random');
  }
  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(this.myAppUrl + this.myApiUrl + id);
  }
  getProductSearch(name: string): Observable<Product[]> {
    let urlAux = this.myAppUrl + this.myApiUrl + 'search/';
    let type = 'brand';
    if (this.brandSelected == '') {
      this.brandSelected = 'all';
    }
    if (this.categorySelected != '') {
      type = 'category';
    }
    if (type == 'brand') {
      return this.http.get<Product[]>(
        urlAux + name + '/' + this.brandSelected + '/' + type
      );
    } else {
      return this.http.get<Product[]>(
        urlAux + name + '/' + this.categorySelected + '/' + type
      );
    }
  }
  productExists(product: Product): Observable<boolean> {
    return this.http.post<boolean>(
      this.myAppUrl + this.myApiUrl + 'cart/product',
      product
    );
  }
  getProductsByBrand(brand: string): Observable<Product[]> {
    let urlAux = this.myAppUrl + this.myApiUrl + 'brand/';
    return this.http.get<Product[]>(urlAux + brand + '/' + this.pageNumber);
  }

  getProductsByBrandCategorySubcategory(
    brand: string,
    category: string,
    subcategory: string
  ): Observable<Product[]> {
    let urlAux =
      this.myAppUrl +
      this.myApiUrl +
      `params/brand-subcategory/${category}/${subcategory}/${brand}/`;
    return this.http.get<Product[]>(urlAux + this.pageNumber);
  }

  getProductsByCategorySubcategory(
    category: string,
    subcategory: string
  ): Observable<Product[]> {
    let urlAux =
      this.myAppUrl +
      this.myApiUrl +
      `params/subcategory/${category}/${subcategory}/${undefined}/`;
    return this.http.get<Product[]>(urlAux + this.pageNumber);
  }

  getProductsByBrandCategory(
    brand: string,
    category: string
  ): Observable<Product[]> {
    let urlAux =
      this.myAppUrl +
      this.myApiUrl +
      `params/brand-category/${category}/${undefined}/${brand}/`;
    return this.http.get<Product[]>(urlAux + this.pageNumber);
  }
  getProductsByCategory(category: string): Observable<Product[]> {
    let urlAux = this.myAppUrl + this.myApiUrl + 'category/';
    return this.http.get<Product[]>(urlAux + category + '/' + this.pageNumber);
  }
  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, {
      withCredentials: true,
    });
  }
  deleteProducts(): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}`, {
      withCredentials: true,
    });
  }
  saveProduct(productAux: Product): Observable<void> {
    const formData = new FormData();
    if (productAux.temporaryFile) {
      formData.append('file', productAux.temporaryFile);
    }
    formData.append('product', JSON.stringify(productAux));
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, formData, {
      withCredentials: true,
    });
  }
  updateProduct(id: string, productAux: Product): Observable<void> {
    return this.http.patch<void>(
      `${this.myAppUrl}${this.myApiUrl}${id}`,
      productAux
    );
  }
}
