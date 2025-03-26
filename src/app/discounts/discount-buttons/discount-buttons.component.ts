import { Component, inject, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/Brand';
import { Category } from 'src/app/models/Category';
import { Product } from 'src/app/models/Product';
import { User } from 'src/app/models/User';
import { BrandsService } from 'src/app/services/brands.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { DiscountsService } from 'src/app/services/discounts.service';
import { EmailService } from 'src/app/services/email.service';
import { ProductService } from 'src/app/services/product.service';
import { ProgressService } from 'src/app/services/progress.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-discount-buttons',
  templateUrl: './discount-buttons.component.html',
  styleUrls: ['./discount-buttons.component.css'],
})
export class DiscountButtonsComponent implements OnInit {
  brandService = inject(BrandsService);
  brands: Brand[] = [];
  productService = inject(ProductService);
  products: Array<Product> = [];
  discountService = inject(DiscountsService);
  progress: number = 0;
  progressService = inject(ProgressService);
  emails: Array<string> = [];
  emailService = inject(EmailService);
  onBrand: boolean = true;
  onCategory: boolean = false;
  brandSelected: Brand = new Brand('', '', '');
  categorySelected: Category = new Category('', '', '');
  categories: Category[] = [];
  categoryService = inject(CategoriesService);

  async ngOnInit() {
    this.productService.returnObservable().subscribe((products) => {
      this.products = products;
    });
    this.progressService.returnNumber().subscribe((numberAux) => {
      this.progress = numberAux;
    });
    await this.getBrands();
    await this.getCategories();
  }

  async getBrands() {
    (await this.brandService.readBrands()).subscribe((brands) => {
      this.brands = brands;
    });
    if (this.brands.length > 0) {
      this.brandSelected = this.brands[0];
    }
  }

  async getCategories() {
    (await this.categoryService.readCategories()).subscribe((categoriesAux) => {
      this.categories = categoriesAux;
    });
    if (this.categories.length > 0) {
      this.categorySelected = this.categories[0];
    }
  }

  async getProducts() {
    ///TO DO PAGE NUMBER ON READ PRODUCTS
    if (this.onBrand && !this.onCategory) {
      (
        await this.productService.readProducts('brand', this.brandSelected.name)
      ).subscribe((products) => {
        this.products = products;
      });
    } else if (this.onCategory && !this.onBrand) {
      (
        await this.productService.readProducts(
          'category',
          this.categorySelected.name
        )
      ).subscribe((products) => {
        this.products = products;
      });
    }
  }

  searchBrandByID(brandID: string) {
    let i = 0;
    let access = false;

    while (i < this.brands.length && !access) {
      if (this.brands[i].name == brandID) {
        access = true;
      } else {
        i++;
      }
    }
    if (access) {
      return this.brands[i];
    } else {
      return this.brandSelected;
    }
  }
  searchCategoryByName(name: string) {
    let i = 0;
    let access = false;

    while (i < this.categories.length && !access) {
      if (this.categories[i].name == name) {
        access = true;
      } else {
        i++;
      }
    }
    if (access) {
      return this.categories[i];
    } else {
      return this.categorySelected;
    }
  }

  selectBrand(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.brandSelected = this.searchBrandByID(selectedValue);
  }
  selectCategory(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.categorySelected = this.searchCategoryByName(selectedValue);
  }

  selectByCategory() {
    this.onBrand = false;
    this.onCategory = true;
  }

  selectByBrand() {
    this.onBrand = true;
    this.onCategory = false;
  }

  async setDiscount() {
    let miInp = document.getElementById('discountInp') as HTMLInputElement;
    let inputParsed = 0;
    if (miInp) {
      inputParsed = parseFloat(miInp.value);
    }
    if (inputParsed > 0) {
      await this.getProducts();
      if (this.products.length > 0) {
        for (let i = 0; i < this.products.length; i++) {
          this.products[i].discount = inputParsed;
          await this.productService
            .updateProduct(this.products[i].id, this.products[i])
            .toPromise();
          let progressAux = (i * 100) / this.products.length;
          this.progressService.updateNumber(progressAux).subscribe(() => {});
        }
        this.progressService.updateNumber(100);
      }
      let productHTML = this.products
        .map(
          (product) =>
            `<p style="color: black;">${product.name} - ${
              product.discount * 100
            }% OFF</p>`
        )
        .join('');
      let html = `
    <div style="font-family: sans-serif; border: 2px solid orange; padding: 1vi; height: fit-content; background-color: rgb(239, 239, 239);">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8NCmCrXwgexWDbhCLBeyLUpFBi4FxQA9Zhw&s" style="margin-left: 38%;" alt="">
        <h1 style="color: rgb(0, 125, 221); text-align: center;">Mirá estos descuentos!</h1>
        <h3 style="text-align: center; color: black;">Tenemos descuentos en estos productos: </h3>
        <h4 color: black;>DETALLE DE LOS PRODUCTOS</h4>
        ${productHTML}
    </div>
</div>`;

      let subject = 'DESCUENTOS';
      ///await this.emailService.sendEmailTC(this.emails, subject, html);
      this.discountService.changeBoolean('added', true);
      this.discountService.changeBoolean('deleted', false);
      window.scrollTo(0, 0);
    } else {
      this.discountService.changeBoolean('added', false);
    }
  }
  async deleteDiscounts() {
    await this.getProducts();
    if (this.products.length > 0) {
      for (let i = 0; i < this.products.length; i++) {
        this.products[i].discount = 0;
        await this.productService
          .updateProduct(this.products[i].id, this.products[i])
          .toPromise();
        let progressAux = (i * 100) / this.products.length;
        this.progressService.updateNumber(progressAux).subscribe(() => {});
      }
      this.progressService.updateNumber(100);
      this.discountService.changeBoolean('deleted', true);
      this.discountService.changeBoolean('added', false);
      window.scrollTo(0, 0);
    } else {
      this.discountService.changeBoolean('deleted', false);
    }
  }
}
