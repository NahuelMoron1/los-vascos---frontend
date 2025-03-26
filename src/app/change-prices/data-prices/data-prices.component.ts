import { Component, inject, OnInit } from '@angular/core';
import { SkyWaitService } from '@skyux/indicators';
import { Brand } from 'src/app/models/Brand';
import { Category } from 'src/app/models/Category';
import { Options } from 'src/app/models/Options';
import { Product } from 'src/app/models/Product';
import { BrandsService } from 'src/app/services/brands.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { OptionsService } from 'src/app/services/options.service';
import { ProductService } from 'src/app/services/product.service';
import { ProgressService } from 'src/app/services/progress.service';
import { WaitService } from 'src/app/services/wait.service';

@Component({
  selector: 'app-data-prices',
  templateUrl: './data-prices.component.html',
  styleUrls: ['./data-prices.component.css'],
})
export class DataPricesComponent implements OnInit {
  brandService = inject(BrandsService);
  brands: Brand[] = [];
  onBrand: boolean = true;
  onCategory: boolean = false;
  brandSelected: Brand = new Brand('', '', '');
  categorySelected: Category = new Category('', '', '');
  categories: Category[] = [];
  categoryService = inject(CategoriesService);
  productService = inject(ProductService);
  products: Product[] = [];
  optionService = inject(OptionsService);
  options: Options[] = [];
  progressService = inject(ProgressService);
  progress: number = 0;
  waitSvc = inject(WaitService);

  async ngOnInit() {
    await this.getBrands();
    await this.getCategories();
    this.progressService.returnNumber().subscribe((numberAux) => {
      this.progress = numberAux;
    });
  }
  selectByCategory() {
    this.onBrand = false;
    this.onCategory = true;
  }

  selectByBrand() {
    this.onBrand = true;
    this.onCategory = false;
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

  async modifyPrices(percentage: number, increase: boolean) {
    for (let i = 0; i < this.products.length; i++) {
      (
        await this.optionService.readProductOptions(this.products[i].id)
      ).subscribe((options) => {
        this.options = options;
      });
      if (this.options.length > 0) {
        await this.changeValuesForPrices(percentage, increase);
      }
      let progressAux = (i * 100) / this.products.length;
      this.progressService.updateNumber(progressAux).subscribe(() => {});
    }
    this.progressService.updateNumber(100).subscribe(() => {});
  }

  async changeValuesForPrices(percentage: number, increase: boolean) {
    for (let i = 0; i < this.options.length; i++) {
      if (increase) {
        this.options[i].price =
          this.options[i].price + (this.options[i].price * percentage) / 100;
      } else {
        this.options[i].price =
          this.options[i].price - (this.options[i].price * percentage) / 100;
      }
      await this.optionService.updateOneOption(
        i,
        this.options[i],
        this.options[i].id
      );
    }
  }

  async changePrices(increase: boolean) {
    this.waitSvc.displayWait(true);
    let inpAux = document.getElementById('percentageInp') as HTMLInputElement;
    if (inpAux) {
      let percentage = parseFloat(inpAux.value);
      if (percentage > 0 && percentage < 100) {
        let confirmed = confirm('Cambiar los precios en ' + percentage + '% ?');
        if (confirmed) {
          await this.getProducts();
          await this.modifyPrices(percentage, increase);
        }
      } else {
        alert('El porcentaje de cambio debe ser mayor a 0 y menor que 100');
      }
    }
    this.waitSvc.displayWait(false);
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
}
