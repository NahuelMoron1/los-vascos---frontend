import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/models/Brand';
import { Category } from 'src/app/models/Category';
import { Product } from 'src/app/models/Product';
import { PublicUser } from 'src/app/models/PublicUser';
import { Subcategory } from 'src/app/models/Subcategory';
import { BrandsService } from 'src/app/services/brands.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { CookieService } from 'src/app/services/cookie.service';
import { ProductService } from 'src/app/services/product.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrl: './parameters.component.css',
})
export class ParametersComponent implements OnInit {
  submenuVisible: boolean[] = [false, false, false, false, false, false];
  categories?: Category[];
  categoryService = inject(CategoriesService);
  productService = inject(ProductService);
  activeRoute = inject(ActivatedRoute);
  @Input() productsArray?: Product[];
  onCategory?: boolean;
  brands?: Brand[];
  category?: Category;
  brandService = inject(BrandsService);
  admin: PublicUser = new PublicUser('', '', '', false);
  cookieService = inject(CookieService);
  categoryName?: string;
  brandName?: string;
  displaySubCategories?: boolean;
  subcategories?: Subcategory[];
  subcategoriesService = inject(SubcategoryService);
  constructor(private router: Router) {
    const categoryAux = this.activeRoute.snapshot.params['category']; //En ambos casos se leen los parametros de la ruta para ver si se trata de una marca o una categoria
    if (categoryAux) {
      this.categoryName = categoryAux;
      this.onCategory = true;
    }
  }

  reloadCategory(categoryName: string) {
    if (
      !this.checkForCategory() &&
      this.checkForBrand() &&
      this.brandName &&
      categoryName
    ) {
      window.location.href = `/categories/${categoryName}/brands/${this.brandName}`;
    } else {
      window.location.href = `/categories/${categoryName}`;
    }
  }
  checkForCategory() {
    if (this.router.url.includes('categories')) {
      const parts = this.router.url.split('/'); // Divide la URL en partes
      const index = parts.indexOf('categories'); // Busca la posición de "categories"

      if (index !== -1 && parts[index + 1]) {
        this.categoryName = parts[index + 1]; // Toma la parte siguiente como el nombre de la categoría
      }
      return true;
    }
    return false;
  }
  checkForBrand() {
    if (this.router.url.includes('brands')) {
      const parts = this.router.url.split('/'); // Divide la URL en partes
      const index = parts.indexOf('brands'); // Busca la posición de "categories"

      if (index !== -1 && parts[index + 1]) {
        this.brandName = parts[index + 1]; // Toma la parte siguiente como el nombre de la categoría
      }
      return true;
    }
    return false;
  }
  reloadBrand(brandName: string) {
    if (
      !this.checkForBrand() &&
      this.checkForCategory() &&
      brandName &&
      this.categoryName
    ) {
      window.location.href = `/categories/${this.categoryName}/brands/${brandName}`;
    } else {
      if (brandName) {
        window.location.href = `/products/brands/${brandName}`;
      }
    }
  }
  searchBySubcategory(subcategoryname: string) {
    if (
      this.checkForBrand() &&
      this.brandName &&
      this.categoryName &&
      subcategoryname
    ) {
      window.location.href = `/categories/${this.categoryName}/subcategories/${subcategoryname}/brands/${this.brandName}`;
    } else {
      window.location.href = `/categories/${this.categoryName}/subcategories/${subcategoryname}`;
    }
  }
  toggleSubmenu(index: number): void {
    this.submenuVisible[index] = !this.submenuVisible[index];
  }
  async ngOnInit() {
    this.productService.returnObservable().subscribe((products) => {
      this.productsArray = products;
    });
    (await this.categoryService.readCategories()).subscribe((categories) => {
      this.categories = categories;
    });
    (await this.brandService.readBrands()).subscribe((brands) => {
      this.brands = brands;
    });
    if (this.onCategory && this.categoryName) {
      this.category = await this.categoryService.readCategoryByName(
        this.categoryName
      );
      if (this.category?.id) {
        (
          await this.subcategoriesService.readSubcategories(this.category?.id)
        ).subscribe((results) => {
          this.subcategories = results;
        });
      }
    }
    (await this.cookieService.getAdmin()).subscribe((data) => {
      this.admin = data;
    });
  }
  countProducts(type: string, value: string) {
    let count = 0;
    if (this.productsArray)
      if (type == 'brand') {
        count = this.productsArray.filter(
          (product) => product.brand === value
        ).length;
      }
    return count;
  }
  isAdmin() {
    //funcion para detectar si el usuario logueado es administrador
    if (this.admin.email !== '') {
      return true;
    } else {
      return false;
    }
  }
}
