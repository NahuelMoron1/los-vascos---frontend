import { Component, inject, Inject, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { CategoriesService } from 'src/app/services/categories.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-categories-menu',
  templateUrl: './categories-menu.component.html',
  styleUrl: './categories-menu.component.css',
})
export class CategoriesMenuComponent implements OnInit {
  categories?: Category[];
  bffurl?: string;
  categoryService = inject(CategoriesService);
  async ngOnInit() {
    this.bffurl = environment.endpoint;
    (await this.categoryService.readCategories()).subscribe((categories) => {
      this.categories = categories;
    });
  }
}
