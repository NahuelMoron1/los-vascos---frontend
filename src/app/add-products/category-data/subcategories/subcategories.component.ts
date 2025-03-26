import { Component, inject, Input } from '@angular/core';
import { Subcategory } from 'src/app/models/Subcategory';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { WaitService } from 'src/app/services/wait.service';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrl: './subcategories.component.css',
})
export class SubcategoriesComponent {
  @Input() categoryID?: string;
  private subCategoryService = inject(SubcategoryService);
  private waitService = inject(WaitService);

  generateRandomId(length: number = 16): string {
    //Genera un codigo random de 16 caracteres y lo devuelve. Sirve para los ID
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  async addNewElement() {
    this.waitService.displayWait(true);
    const id = this.generateRandomId();
    const nameAux = document.getElementById(
      'subcategoryInp'
    ) as HTMLInputElement;
    if (nameAux && this.categoryID) {
      const name: string = nameAux.value;
      const subCategory: Subcategory = new Subcategory(
        id,
        name,
        this.categoryID
      );
      await this.subCategoryService.saveSubcategory(subCategory).toPromise();
    }
    this.waitService.displayWait(false);
    location.reload();
  }
}
