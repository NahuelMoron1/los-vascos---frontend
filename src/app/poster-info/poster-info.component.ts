import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-poster-info',
  templateUrl: './poster-info.component.html',
  styleUrls: ['./poster-info.component.css'],
})
export class PosterInfoComponent implements OnInit {
  activeRoute = inject(ActivatedRoute);
  methodSelected?: string;
  filterSelected?: string;
  methodSelected3?: string;
  subCategory?: string;
  methodSelected2?: string;
  filterSelected2?: string;

  constructor(private router: Router) {}
  ngOnInit(): void {
    this.checkForProducts();
    this.checkForContact();
  }

  checkForContact() {
    const onContact = this.router.url.includes('contactus');
    if (onContact) {
      this.filterSelected = 'Contacto';
    }
  }

  checkForProducts() {
    const categoryAux = this.activeRoute.snapshot.params['category']; //En ambos casos se leen los parametros de la ruta para ver si se trata de una marca o una categoria
    const brandAux = this.activeRoute.snapshot.params['brand'];
    const subCategoryAux = this.activeRoute.snapshot.params['subcategory']; //En ambos casos se leen los parametros de la ruta para ver si se trata de una marca o una categoria
    if (categoryAux && brandAux) {
      this.methodSelected = 'CATEGORÍA';
      this.filterSelected = categoryAux;
      this.methodSelected2 = 'MARCA';
      this.filterSelected2 = brandAux;
      if (subCategoryAux) {
        this.methodSelected3 = 'SUBCATEGORÍA';
        this.subCategory = subCategoryAux;
      }
    } else {
      if (categoryAux) {
        this.methodSelected = 'CATEGORÍA';
        this.filterSelected = categoryAux;
        if (subCategoryAux) {
          this.methodSelected3 = 'SUBCATEGORÍA';
          this.subCategory = subCategoryAux;
        }
      } else if (brandAux) {
        this.methodSelected = 'MARCA';
        this.filterSelected = brandAux;
      }
    }
  }
}
