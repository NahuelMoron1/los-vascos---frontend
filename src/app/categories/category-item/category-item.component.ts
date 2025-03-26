import { Component, OnInit, inject } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { PublicUser } from 'src/app/models/PublicUser';
import { CategoriesService } from 'src/app/services/categories.service';
import { CookieService } from 'src/app/services/cookie.service';
import { WaitService } from 'src/app/services/wait.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css'],
})
export class CategoryItemComponent implements OnInit {
  private categoryService = inject(CategoriesService);
  public categories: Array<Category> = [];
  private waitSvc = inject(WaitService);
  cookieService = inject(CookieService);
  admin: PublicUser = new PublicUser('', '', '', false);
  bffurl = environment.endpoint;
  async ngOnInit(): Promise<void> {
    this.waitSvc.displayWait(true);
    await this.readCategories();
    (await this.cookieService.getAdmin()).subscribe((data) => {
      this.admin = data;
    });
    this.waitSvc.displayWait(false);
  }
  selectCategory(name: string) {
    this.categoryService.changeSelected(name);
  }
  async readCategories(): Promise<void> {
    const categoriesAux = await this.getCategories();
    if (categoriesAux != undefined) {
      for (let i = 0; i < categoriesAux.length; i++) {
        this.categories.push(categoriesAux[i]);
      }
    }
  }
  async getCategories(): Promise<Category[] | undefined> {
    try {
      const data = await this.categoryService.getCategories().toPromise();
      console.log(data?.length);
      return data;
    } catch (error) {
      console.error('Error obteniendo datos:', error);
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }
  async deleteCategory(categoryID: string | undefined) {
    this.waitSvc.displayWait(true);
    if (categoryID && this.admin.email !== '') {
      await this.categoryService.deleteCategory(categoryID).toPromise();
    }
    this.waitSvc.displayWait(false);
    location.reload();
  }
}
