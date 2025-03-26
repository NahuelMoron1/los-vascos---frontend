import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { BrandsService } from 'src/app/services/brands.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  searchTerm: string = '';
  productService = inject(ProductService);
  brandService = inject(BrandsService);
  categoryService = inject(CategoriesService);
  categorySelected: string = '';
  brandSelected: string = '';
  products: Product[] = [];
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.addEventButton();
    this.brandService.getBrandSelected().subscribe((brand) => {
      this.brandSelected = brand;
    });
    this.categoryService.returnSelected().subscribe((category) => {
      this.categorySelected = category;
    });
  }
  async updateSearchResults() {
    if (this.searchTerm != '') {
      (
        await this.productService.readProducts('search', this.searchTerm)
      ).subscribe((products) => {
        this.products = products;
      });
      if (!this.router.url.includes('products')) {
        window.location.href = `/products?search=${this.searchTerm}`;
      }
    }
  }
  addEventButton() {
    let myButton = document.getElementById('myButton') as HTMLButtonElement;
    let myInput = document.getElementById('searchbarInp') as HTMLInputElement;
    myInput.addEventListener('keypress', (evento) => {
      if (evento.key === 'Enter') {
        evento.preventDefault(); // Evita el comportamiento por defecto del Enter
        myButton.click();
      }
    });
  }
}
