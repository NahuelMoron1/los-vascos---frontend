import { Component, OnInit, inject } from '@angular/core';
import { Brand } from 'src/app/models/Brand';
import { PublicUser } from 'src/app/models/PublicUser';
import { BrandsService } from 'src/app/services/brands.service';
import { CookieService } from 'src/app/services/cookie.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-select-brand',
  templateUrl: './select-brand.component.html',
  styleUrls: ['./select-brand.component.css'],
})
export class SelectBrandComponent implements OnInit {
  brandService = inject(BrandsService);
  brandSelected: string = '';
  brandsArray: Array<Brand> = [];
  productService = inject(ProductService);
  admin: PublicUser = new PublicUser('', '', '', false);
  cookieService = inject(CookieService);
  async ngOnInit() {
    this.readBrands();
    this.brandService.getBrandSelected().subscribe((result) => {
      this.brandSelected = result;
    });
    (await this.cookieService.getAdmin()).subscribe((data) => {
      this.admin = data;
    });
  }
  async readBrands() {
    const brandsAux = await this.getBrands();
    if (brandsAux != undefined) {
      for (let i = 0; i < brandsAux.length; i++) {
        this.brandsArray.push(brandsAux[i]);
      }
    }
  }
  async getBrands() {
    try {
      const data = await this.brandService.getBrands().toPromise();
      console.log(data?.length);
      return data;
    } catch (error) {
      console.error('Error obteniendo datos:', error);
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }

  async onSelectBrand(brand: string) {
    this.brandService.changeSelected(brand);
    this.productService.changeLoading('true').subscribe(() => {});
    if (brand == 'all') {
      window.location.href = '/products';
    } else {
      window.location.href = `/products/brands/${brand}`;
    }
    this.productService.changeLoading('false').subscribe(() => {});
  }
  isAdmin() {
    if (this.admin.email != '') {
      return true;
    } else {
      return false;
    }
  }
  selected(name: string) {
    if (name == this.brandSelected) {
      return true;
    } else {
      return false;
    }
  }
  allBrandsSelected() {
    if (this.brandSelected == 'all') {
      return true;
    } else {
      return false;
    }
  }
}
