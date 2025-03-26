import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/Brand';
import { Category } from 'src/app/models/Category';
import { Subcategory } from 'src/app/models/Subcategory';
import { BrandsService } from 'src/app/services/brands.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { WaitService } from 'src/app/services/wait.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category-data',
  templateUrl: './category-data.component.html',
  styleUrl: './category-data.component.css',
})
export class CategoryDataComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  activeRoute = inject(ActivatedRoute);
  categoriesService = inject(CategoriesService);
  waitService = inject(WaitService);
  brandService = inject(BrandsService);
  subcategoryService = inject(SubcategoryService);

  modifyCategory?: Category;
  modifyBrand?: Brand;
  subcategories?: Subcategory[];
  subcategory?: Subcategory;

  added?: boolean;
  onModify?: boolean;
  toModify?: boolean;
  modified?: boolean;
  featureModify?: boolean;
  optionUpdated?: boolean;
  isBrand?: boolean;
  isCategory?: boolean;

  elementID?: string;
  bffUrl?: string;
  subcategoryName?: string;
  imagePreview?: string | null;

  selectedFile: File | null = null;
  constructor(private router: Router) {
    this.isCategory = this.router.url.includes('category');
    this.isBrand = this.router.url.includes('brand');
  }
  async ngOnInit() {
    this.modified = false;
    this.bffUrl = environment.endpoint;
    this.enableOrDisableInputs();
    if (this.activeRoute.snapshot.params.hasOwnProperty('id')) {
      //Se comprueba que la ruta contenga el ID del producto a modificar
      this.elementID = this.activeRoute.snapshot.params['id']; //Si el parametro existe se lo asigna al product ID
      this.onModify = true;
      await this.searchForElement();
      if (this.isCategory && this.elementID) {
        (
          await this.subcategoryService.readSubcategories(this.elementID)
        ).subscribe((results) => {
          this.subcategories = results;
          this.subcategoryName = this.subcategories[0].name;
        });
      }
    }
  }
  async deleteSubcategory() {
    this.waitService.displayWait(true);
    if (this.subcategories && this.subcategoryName) {
      const confirmation = confirm(
        'Borrar la subcategoría ' + this.subcategoryName + '?'
      );
      if (confirmation) {
        this.subcategoryService
          .deleteSubcategoryByName(this.subcategoryName)
          .toPromise();
      }
      this.waitService.displayWait(false);
      location.reload();
    }
  }
  changeSubcategory(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.subcategoryName = selectedValue;
  }
  async searchForElement() {
    if (this.onModify && this.elementID) {
      if (this.isCategory && !this.isBrand) {
        this.modifyCategory = await this.categoriesService.readCategory(
          this.elementID
        );
      } else if (this.isBrand && !this.isCategory) {
        this.modifyBrand = await this.brandService.setOneBrand(this.elementID);
      }
      if (this.modifyCategory) {
        this.imagePreview = this.bffUrl + this.modifyCategory.image;
      } else if (this.modifyBrand) {
        this.imagePreview = this.bffUrl + this.modifyBrand.image;
      }
    }
  }

  getString(name: string): string {
    //La funcion sirve para leer cada uno de los input del html, siempre y cuando sean string
    let divAux = document.getElementById(name) as HTMLInputElement;
    let miDiv = '';
    if (divAux != null && divAux != undefined) {
      miDiv = divAux.value;
    }
    return miDiv;
  }

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
  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  // Lee el archivo seleccionado
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      if (!this.selectedFile.type.startsWith('image/')) {
        alert('Por favor, selecciona un archivo de imagen válido.');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
  getValue(name: string) {
    //Para la informacion de los inputs si vas a modificar un producto
    if (name !== '' && (this.modifyCategory || this.modifyBrand)) {
      switch (name) {
        case 'name':
          if (this.isBrand) {
            return this.modifyBrand?.name;
          } else {
            return this.modifyCategory?.name;
          }
        case 'image':
          if (this.isBrand) {
            return this.imagePreview;
          } else {
            return this.imagePreview;
          }
      }
      return '';
    } else {
      return '';
    }
  }
  enableOrDisableInputs() {
    ///Se habilitan o deshabilitan los input de la parte de PRODUCTO, NO CONFUNDIR, SOLO PRODUCTO, NO CARACTERISTICAS
    const productInfo = document.querySelectorAll('.productInfo'); //se seleccionan todos los input con esa clase
    productInfo.forEach((input) => {
      //Para cada uno de los input...
      if (!this.toModify && this.onModify) {
        //Si no se quiere modificar y el boton de modificar no se apreta...
        input.setAttribute('disabled', 'disabled'); //Se deshabilita la escritura del input
      } else {
        //Si se quiere modificar y el boton de modificar se apreta...
        input.removeAttribute('disabled'); //Se habilita la escritura del input
      }
    });
  }
  getItemsElement() {
    if (!this.onModify) {
      this.elementID = this.generateRandomId(16);
    }
    let name = this.getString('nameInp');
    let image = this.selectedFile;

    if (name.length == 0 || (!image && !this.imagePreview)) {
      alert('Los campos con asteriscos no pueden estar vacíos');
      return null;
    }
    if (this.elementID && this.imagePreview && name) {
      const imageResult = this.imagePreview.substring(
        this.imagePreview.indexOf('uploads')
      );
      if (this.isCategory && !this.isBrand) {
        let categoryAux = new Category(
          this.elementID,
          name,
          this.onModify ? imageResult : ''
        );
        if (!this.onModify) {
          categoryAux.temporaryFile = image;
        }
        return categoryAux;
      } else {
        let brandAux = new Brand(
          this.elementID,
          name,
          this.onModify ? imageResult : ''
        );
        if (!this.onModify) {
          brandAux.temporaryFile = image;
        }
        return brandAux;
      }
    }
    return;
  }
  async addNewElement() {
    this.waitService.displayWait(true);
    const element = this.getItemsElement();
    if (element) {
      if (this.isCategory && !this.isBrand && element instanceof Category) {
        await this.categoriesService.saveCategory(element).toPromise();
        this.added = true; //Al estar en verdadero se activara el mensaje de producto cargado}
        this.waitService.displayWait(false);
        window.location.href = `/modify/category/${element?.id}`;
      } else if (this.isBrand && !this.isCategory && element instanceof Brand) {
        await this.brandService.saveBrand(element).toPromise();
        this.added = true; //Al estar en verdadero se activara el mensaje de producto cargado}
        this.waitService.displayWait(false);
        window.location.href = `/modify/brand/${element?.id}`;
      }
    }
    this.waitService.displayWait(false);
  }
  async modifyOneElement() {
    //Funcion que se invoca cuando se apreta el boton de cambiar, para este paso ya se ha apretado el boton de modificar
    this.waitService.displayWait(true);
    let element = this.getItemsElement(); //Se crea un nuevo producto y se le asignan los input a travez de esa funcion
    if (element && this.elementID) {
      if (this.isCategory && !this.isBrand && element instanceof Category) {
        await this.categoriesService
          .updateCategory(this.elementID, element)
          .toPromise();
      } else if (this.isBrand && !this.isCategory && element instanceof Brand) {
        await this.brandService
          .updateBrand(this.elementID, element)
          .toPromise();
      }
      this.toModify = false; //Despues de modificar todo, el a modificar queda en falso, ya que ya modificó lo que quiso y lo guardó
      this.modified = true; //Despues de modificar todo, el modificado queda en verdadero, para que el html detecte esto y ponga el mensaje de modificacion correcta
      this.enableOrDisableInputs(); //Se vuelve a cambiar la habilitacion de los inputs del producto, en este caso se van a deshabilitar nuevamente
    }
    this.waitService.displayWait(false);
  }
  modify() {
    //Funcion que se invoca cuando se apreta el boton de modificar el producto
    this.toModify = true; //Se quiere modificar, por lo que a modificar va a ser verdadero
    this.modified = false; //Todavia no se ha modificado nada, por lo que esto queda en falso
    this.enableOrDisableInputs(); //Se llama a la funcion para que habilite la escritura de los input SOLO de producto
  }
}
