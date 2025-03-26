import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/Brand';
import { Category } from 'src/app/models/Category';
import { Feature } from 'src/app/models/Feature';
import { Options } from 'src/app/models/Options';
import { Product } from 'src/app/models/Product';
import { Subcategory } from 'src/app/models/Subcategory';
import { BrandsService } from 'src/app/services/brands.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { FeatureService } from 'src/app/services/feature.service';
import { OptionsService } from 'src/app/services/options.service';
import { ProductService } from 'src/app/services/product.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { WaitService } from 'src/app/services/wait.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-data',
  templateUrl: './product-data.component.html',
  styleUrls: ['./product-data.component.css'],
})
export class ProductDataComponent implements OnInit {
  @Output() onModifyChange = new EventEmitter<boolean>(); // Output para emitir el valor
  @Output() optionsChange = new EventEmitter<Options[]>(); // Output para emitir el valor
  @Output() optionSelectedChange = new EventEmitter<Options>(); // Output para emitir el valor
  @Output() optionTermChange = new EventEmitter<string>(); // Output para emitir el valor
  @Output() productIDChange = new EventEmitter<string>(); // Output para emitir el valor
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  productService = inject(ProductService);
  brandService = inject(BrandsService);
  activeRoute = inject(ActivatedRoute);
  featureService = inject(FeatureService);
  optionService = inject(OptionsService);
  categoriesService = inject(CategoriesService);
  waitService = inject(WaitService);
  subcategoriesService = inject(SubcategoryService);

  bffURL: string = environment.endpoint;
  imagePreview?: string | null;
  category?: string;
  brand?: string;
  pricesID?: string;
  optionTerm?: string;
  searchTerm?: string;
  productID?: string;
  subcategoryName?: string;

  added?: boolean;
  onModify?: boolean;
  toModify?: boolean;
  modified?: boolean;
  featureModify?: boolean;
  optionUpdated?: boolean;

  optionsSearched?: Options[];
  features?: Feature[];
  options?: Options[];
  brands?: Brand[];
  categories?: Category[];
  subcategories?: Subcategory[];

  modifyProduct: Product = new Product('', '', '', '', 0, '', 0, '', 0, 0);
  optionSelected: Options = new Options('', '', '', 0, 0);
  selectedFile: File | null = null;
  async ngOnInit() {
    if (this.activeRoute.snapshot.params.hasOwnProperty('id')) {
      //Se comprueba que la ruta contenga el ID del producto a modificar
      this.productID = this.activeRoute.snapshot.params['id']; //Si el parametro existe se lo asigna al product ID
      this.productIDChange.emit(this.productID); // Emitir el valor después de asignarlo
    }
    this.modified = false;
    this.optionUpdated = this.messageUpdated();
    this.featureModify = false; //Se pone estos dos atributos en falso para garantizar que no se pueda modificar si se esta buscando agregar un nuevo producto
    (await this.brandService.readBrands()).subscribe((brands) => {
      this.brands = brands; //Se leen las marcas para seleccionar
    });
    (await this.categoriesService.readCategories()).subscribe((categories) => {
      this.categories = categories;
    });
    if (this.categories && this.categories[0].id) {
      (
        await this.subcategoriesService.readSubcategories(this.categories[0].id)
      ).subscribe((results) => {
        this.subcategories = results;
      });
    }
    if (!this.onModify && this.brands && this.categories) {
      this.brand = this.brands[0].name;
      this.category = this.categories[0].name;
    }
    if (this.productID) {
      //Si el product ID tiene informacion
      this.onModify = await this.readProduct(); //Se busca el producto, si lo encuentra retorna verdadero, por lo que se busca modificar. Si no lo encuentra retorna falso, por lo que se lleva a agregar
      if (this.onModify) {
        this.onModifyChange.emit(this.onModify);
        //Si se retorna verdadero en la funcion de read product significa que puede modificar y entra aca
        (
          await this.featureService.readProductFeatures(this.productID)
        ).subscribe((featuresAux) => {
          this.features = featuresAux; //Se buscan y se retornan las caracteristicas
        });
        this.category = this.modifyProduct.category;
        this.changeCategory(this.modifyProduct.category, false);
        this.enableOrDisableInputs(); //Se ponen los input en formato READ ONLY
        this.subcategoryName = this.modifyProduct.subcategory;
      }

      this.added = false; //Propiedad para los mensajes de la pagina

      this.optionService
        .getProductOptions(this.productID)
        .subscribe(async (options) => {
          this.options = options;
          for (let i = 0; i < options.length; i++) {
            options[i].name = decodeURIComponent(options[i].name);
          }
          this.optionSelected = options[0];
          this.optionTerm = this.optionSelected.name;
          this.optionSelectedChange.emit(this.optionSelected);
          this.optionTermChange.emit(this.optionTerm);
          this.optionsChange.emit(this.options);
        });
    }
  }

  changeSubcategory(event: Event) {}

  getString(name: string): string {
    //La funcion sirve para leer cada uno de los input del html, siempre y cuando sean string
    let divAux = document.getElementById(name) as HTMLInputElement;
    let miDiv = '';
    if (divAux != null && divAux != undefined) {
      miDiv = divAux.value;
    }
    return miDiv;
  }

  getNumber(name: string) {
    //Misma funcion que la de arriba pero para los numeros
    let divAux = document.getElementById(name) as HTMLInputElement;
    let miDiv = 0;
    if (divAux) {
      miDiv = parseFloat(divAux.value);
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

  getItemsProduct() {
    //Lee los input del producto, crea ese producto y lo retorna
    if (!this.onModify) {
      this.productID = this.generateRandomId(16);
    }
    let name = this.getString('nameInp');
    let image = this.selectedFile;
    let discount = this.getNumber('discountInp');
    let description = this.getString('descriptionInp');

    if (name.length == 0 || (!image && !this.imagePreview)) {
      alert('Los campos con asteriscos no pueden estar vacíos');
      return null;
    }

    if (this.productID && this.brand && this.category && this.imagePreview) {
      const imageResult = this.imagePreview.substring(
        this.imagePreview.indexOf('uploads')
      );
      let productAux = new Product(
        this.productID,
        name,
        this.category,
        this.brand,
        0,
        this.onModify ? imageResult : '',
        discount,
        description,
        1,
        0
      );
      if (!this.onModify) {
        productAux.temporaryFile = image;
      }
      productAux.subcategory = this.subcategoryName ? this.subcategoryName : '';
      return productAux;
    }
    return null;
  }

  async addNewProduct() {
    //La funcion solo sirve para cuando se va a agregar un nuevo producto, NO sirve para MODIFICAR
    this.waitService.displayWait(true);
    let productAux: Product | null = this.getItemsProduct();
    if (productAux != null) {
      await this.productService.saveProduct(productAux).toPromise();
      this.added = true; //Al estar en verdadero se activara el mensaje de producto cargado}
      this.waitService.displayWait(false);
      window.location.href = `/modify/product/${productAux?.id}`;
    }
    this.waitService.displayWait(false);
  }

  enableOrDisableInputs() {
    ///Se habilitan o deshabilitan los input de la parte de PRODUCTO, NO CONFUNDIR, SOLO PRODUCTO, NO CARACTERISTICAS
    const productInfo = document.querySelectorAll('.productInfo'); //se seleccionan todos los input con esa clase
    productInfo.forEach((input) => {
      //Para cada uno de los input...
      if (this.onModify && !this.toModify) {
        //Si no se quiere modificar y el boton de modificar no se apreta...
        input.setAttribute('disabled', 'disabled'); //Se deshabilita la escritura del input
      } else {
        //Si se quiere modificar y el boton de modificar se apreta...
        input.removeAttribute('disabled'); //Se habilita la escritura del input
      }
    });
  }

  modify() {
    //Funcion que se invoca cuando se apreta el boton de modificar el producto
    this.toModify = true; //Se quiere modificar, por lo que a modificar va a ser verdadero
    this.modified = false; //Todavia no se ha modificado nada, por lo que esto queda en falso
    this.enableOrDisableInputs(); //Se llama a la funcion para que habilite la escritura de los input SOLO de producto
  }

  async modifyOneProduct() {
    //Funcion que se invoca cuando se apreta el boton de cambiar, para este paso ya se ha apretado el boton de modificar
    this.waitService.displayWait(true);
    let productAux: Product | null = this.getItemsProduct(); //Se crea un nuevo producto y se le asignan los input a travez de esa funcion
    if (productAux != null && this.productID) {
      await this.productService
        .updateProduct(this.productID, productAux)
        .toPromise();
      this.toModify = false; //Despues de modificar todo, el a modificar queda en falso, ya que ya modificó lo que quiso y lo guardó
      this.modified = true; //Despues de modificar todo, el modificado queda en verdadero, para que el html detecte esto y ponga el mensaje de modificacion correcta
      this.enableOrDisableInputs(); //Se vuelve a cambiar la habilitacion de los inputs del producto, en este caso se van a deshabilitar nuevamente
    }
    this.waitService.displayWait(false);
  }

  async readProduct() {
    //Lee el producto que se trae POR PARAMETRO unicamente si lo que se desea es MODIFICAR
    let productAux = await this.getProduct();
    if (productAux) {
      this.modifyProduct = productAux; //El modify product queda asignado como el producto a modificar, todos los datos del producto tomado por parametro son los datos que van a quedar en esta variable
      this.brand = this.modifyProduct.brand;
      this.imagePreview = this.bffURL + productAux.image;
      this.onModifyBrands();
      return true; //Si el producto existe retorna verdadero para saber que se va a modificar algo existente
    } else {
      return false; //Si el producto no existe retorna falso y no deja modificar, solo agregar
    }
  }

  onModifyBrands() {
    if (this.brands) {
      const index = this.brands.findIndex((b) => b.name === this.brand);

      if (index !== -1) {
        const [brandAux] = this.brands.splice(index, 1); // Elimina el elemento
        this.brands.unshift(brandAux); // Lo mueve al inicio
      }
    }
    if (this.categories) {
      const index = this.categories.findIndex((c) => c.name === this.category);

      if (index !== -1) {
        const [categoryAux] = this.categories.splice(index, 1); // Elimina el elemento
        this.categories.unshift(categoryAux); // Lo mueve al inicio
      }
    }
  }

  async getProduct() {
    //Funcion para traer el producto desde la base de datos pasando primero por el servicio del producto
    if (this.productID) {
      try {
        const data = await this.productService
          .getProduct(this.productID)
          .toPromise();
        console.log(data);
        return data;
      } catch (error) {
        console.error('Error obteniendo datos:', error);
        throw error; // Puedes manejar el error de acuerdo a tus necesidades
      }
    }
    return;
  }

  getValue(name: string) {
    //Para la informacion de los inputs si vas a modificar un producto
    if (name != '' && this.modifyProduct.id != '') {
      switch (name) {
        case 'name':
          return this.modifyProduct.name;

        case 'category':
          return this.modifyProduct.category;

        case 'brand':
          return this.modifyProduct.brand;

        case 'image':
          return this.modifyProduct.image;

        case 'discount':
          return this.modifyProduct.discount;

        case 'description':
          return this.modifyProduct.description;

        case 'price':
          return this.modifyProduct.price;
      }
      return '';
    } else {
      return '';
    }
  }

  modifyFeatures(feature: Feature, index: number) {
    if (this.features) {
      if (feature != undefined && feature != null) {
        this.featureModify = true;
        this.enableOrDisableFeatures(feature.name, feature.value);
        let featureName = this.getString(feature.name);
        let featureValue = this.getString(feature.value);
        if (featureName.length > 0 && featureValue.length > 0) {
          feature.name = featureName;
          feature.value = featureValue;
          this.featureService.updateOneFeature(index, feature);
          this.featureModify = false;
        } else {
          alert('No podes dejar ningun campo vacío');
        }
      } else {
        alert('Seleccione una caracteristica primero');
      }
    } else {
      alert('No hay caracteristicas para modificar');
    }
  }
  enableOrDisableFeatures(name: string, value: string) {
    const nameAux = document.getElementById(name) as HTMLInputElement;
    const valueAux = document.getElementById(value) as HTMLInputElement;
    if (this.featureModify == false) {
      nameAux.setAttribute('disabled', 'disabled');
      valueAux.setAttribute('disabled', 'disabled');
    } else {
      nameAux.removeAttribute('disabled');
      valueAux.removeAttribute('disabled');
    }
  }
  deleteFeature(featureID: string | undefined, index: number) {
    if (featureID != undefined) {
      this.featureService.deleteOneFeature(featureID, index);
    }
  }
  addFeature() {
    let featureName = this.getString('featureInp');
    let featureValue = this.getString('featureValueInp');
    if (this.productID) {
      if (featureName.length > 0 && featureValue.length > 0) {
        let featureAux = new Feature(
          this.generateRandomId(16),
          featureName,
          featureValue,
          this.productID
        );
        this.featureService.createFeature(featureAux);
      } else {
        alert('No podes dejar ningun campo vacío');
      }
    } else {
      alert(
        'Para agregar una caracteristica primero debe completar la carga de un producto'
      );
      window.scrollTo(0, 0);
    }
  }
  messageUpdated() {
    if (localStorage.getItem('updated')) {
      localStorage.removeItem('updated');
      return true;
    } else {
      return false;
    }
  }
  async modifyOptions(optionAux: Options, index: number) {
    if (this.options) {
      const optionOldID = optionAux.id;
      let optionName = this.getString(optionAux.id);
      let optionID = this.getString('modifyIdInp');
      let optionPrice = this.getNumber('modifyCostPriceInp');
      if (optionName.length > 0) {
        optionAux.name = optionName;
        optionAux.id = optionID;
        optionAux.price = optionPrice;
        await this.optionService.updateOneOption(index, optionAux, optionOldID);
        localStorage.setItem('updated', JSON.stringify(true));
        location.reload();
      } else {
        alert('No podes dejar el campo de nombre de opción vacío');
      }
    } else {
      alert('No hay opciones para modificar');
    }
  }

  addOption() {
    let optionName = this.getString('optionInp');
    let optionStock = this.getNumber('stockInp');
    let optionPrice = this.getNumber('costPriceInp');
    if (this.productID && optionName.length > 0) {
      let optionAux = new Options(
        this.generateRandomId(16),
        optionName,
        this.productID,
        optionStock,
        optionPrice
      );
      this.optionService.createOption(optionAux);
    } else {
      alert('No podes dejar el campo de nombre de opción vacío');
    }
  }
  searchOptionByName(nameAux: string) {
    if (this.options) {
      const option = this.options.find((opt) => opt.name === nameAux);
      return option ?? this.optionSelected;
    }
    return this.optionSelected;
  }
  deleteOption(optionSelected: Options) {
    if (this.options) {
      if (optionSelected.id != undefined) {
        this.optionService.deleteOneOption(optionSelected.id);
      }
    } else {
      alert('No hay opciones para eliminar');
    }
  }
  selectOption(nameAux: string) {
    this.optionSelected = this.searchOptionByName(nameAux);
    this.optionTerm = this.optionSelected.name;
    this.optionsSearched = [];
  }
  changeBrand(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.brand = selectedValue;
  }

  async changeCategory(event: Event | string, change: boolean) {
    const selectedValue =
      typeof event === 'string'
        ? event
        : (event.target as HTMLSelectElement).value;
    this.category = selectedValue;
    const categoryAux = await this.categoriesService.readCategoryByName(
      this.category
    );
    if (categoryAux?.id) {
      await this.updateSubcategories(categoryAux.id, change);
    }
  }

  async updateSubcategories(categoryId: string, onChange: boolean) {
    (await this.subcategoriesService.readSubcategories(categoryId)).subscribe(
      (results) => {
        this.subcategories = results;
        if (onChange) {
          this.subcategoryName = this.subcategories[0].name;
        } else {
          this.subcategoryName = this.subcategoryName;
        }
      }
    );
  }

  updateSearchResults() {
    this.optionsSearched = [];
    if (this.options && this.optionTerm) {
      for (let i = 0; i < this.options.length; i++) {
        if (this.options[i].name.includes(this.optionTerm)) {
          this.optionsSearched.push(this.options[i]);
        }
      }
    } else {
      this.optionsSearched = [];
    }
    this.optionTerm = this.optionSelected.name;
  }

  async changePrices(increase: boolean) {
    let inpAux = document.getElementById('percentageInp') as HTMLInputElement;
    if (inpAux) {
      let percentage = parseFloat(inpAux.value);
      if (inpAux.value.length > 0) {
        if (percentage > 0 && percentage < 100) {
          let confirmed = confirm(
            'Cambiar los precios en ' + percentage + '% ?'
          );
          if (confirmed) {
            await this.modifyPrices(percentage, increase);
          }
        } else {
          alert('El porcentaje de cambio debe ser mayor a 0 y menor que 100');
        }
      } else {
        alert('No podes dejar el campo vacio');
      }
    } else {
      alert('No podes dejar el campo vacio');
    }
  }

  async modifyPrices(percentage: number, increase: boolean) {
    if (this.options) {
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
  }
}
