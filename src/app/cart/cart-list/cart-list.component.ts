import { Component, inject } from '@angular/core';
import { Options } from 'src/app/models/Options';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';
import { OptionsService } from 'src/app/services/options.service';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css'],
})
export class CartListComponent {
  cartService = inject(CartService);
  optionService = inject(OptionsService);
  productService = inject(ProductService);
  option: Options = new Options('', '', '', 0, 0);
  products: Array<Product> = [];
  bffUrl: string = environment.endpoint;

  async ngOnInit() {
    this.cartService.getProducts().subscribe((products) => {
      this.products = products; ///Se lee la lista de productos que estan en el carrito y se inicializa en un array de productos
    });
    this.startQuantity();
    await this.checkProductData();
  }

  async checkProductData() {
    if (this.products.length > 0) {
      for (let i = 0; i < this.products.length; i++) {
        var productAux = this.products[i];
        var productOption = this.products[i].optionSelected;
        await this.validateProducts(productAux, productOption, i);
      }
    }
  }

  private async validateProducts(
    productAux: Product,
    productOption: string,
    index: number
  ) {
    const optionSelected = await this.dataExists(
      productAux,
      productOption,
      index
    );
    if (optionSelected !== undefined) {
      if (optionSelected.price !== productAux.price) {
        this.products[index].price = optionSelected.price;
      }
      this.products[index].optionSelected = decodeURIComponent(
        this.products[index].optionSelected
      );
      this.cartService.updateProduct(index, this.products[index]);
    }
  }

  private async dataExists(
    productAux: Product,
    productOption: string,
    index: number
  ) {
    const productExists = await this.productService.productExistsTC(productAux);
    if (!productExists) {
      console.log('PRODUCT NOT EXIST: ', productAux);

      this.cartService.deleteProduct(index);
      this.products.splice(index, 1);
      return;
    } else {
      const optionSelected = await this.optionService.getProductOptionByNameTC(
        productOption,
        productAux.latestID
      );

      if (!optionSelected) {
        console.log('OPTION NOT EXIST', optionSelected);
        this.cartService.deleteProduct(index);
        this.products.splice(index, 1);
        return;
      } else {
        return optionSelected;
      }
    }
  }

  deleteProduct(index: number) {
    ///Al apretar el boton X que se ve en el carrito borra el producto
    this.cartService.deleteProduct(index);
  }
  changeQuantity(productAux: Product) {
    let inpAux = document.getElementById(productAux.id) as HTMLInputElement;
    if (inpAux) {
      let input = parseFloat(inpAux.value);
      if (input > 0) {
        if (productAux.quantity != input) {
          let i = 0;
          let access = false;
          while (i < this.products.length && !access) {
            if (this.products[i].id == productAux.id) {
              access = true;
            } else {
              i++;
            }
          }
          if (access) {
            productAux.quantity = input;
            this.cartService.updateProduct(i, productAux);
          }
        }
      }
    }
  }
  startQuantity() {
    /*Los productos por defecto cuando son cargados en el array de productos no tienen una cantidad asignada, 
    por lo que al cargarlos en el carrito(Si no tienen ya una cantidad asignada ya que pueden estar desde antes en el carrito) 
    se les asigna por defecto 1*/
    for (let i = 0; i < this.products.length; i++) {
      if (!this.products[i].quantity) {
        this.products[i].quantity = 1;
      }
    }
  }
  incrementQuantity(product: Product, index: number) {
    /* Cuando el usuario hace click en el boton +, se llama a esta funcion para que primero recorra la lista de productos, luego
    encuentre el producto y una vez que lo encuentra le cambia la cantidad, en este caso incrementando, pero realiza comprobaciones
    antes para no caer en fallos como por ejemplo revisar que la cantidad que el usuario desea no sea mayor a la del stock disponible */
    //if(product.quantity < product.stock){
    let i = 0;
    let access = false;
    while (i < this.products.length && !access) {
      if (this.products[i].id == product.id) {
        access = true;
      } else {
        i++;
      }
    }
    if (access) {
      this.products[i].quantity = this.products[i].quantity + 1;
      this.cartService.updateProduct(index, this.products[i]);
    }
    //}
  }

  decrementQuantity(product: Product, index: number) {
    /* Cuando el usuario hace click en el boton -, se llama a esta funcion para que primero recorra la lista de productos, luego
    encuentre el producto y una vez que lo encuentra le cambia la cantidad, en este caso decrementando, pero realiza comprobaciones
    antes para no caer en fallos como por ejemplo revisar que la cantidad que el usuario desea no sea menor a 1 unidad, ya que podria
    caer en numeros menores a 0, lo que implicaria fallos a la hora de realizar la compra */
    if (product.quantity > 1) {
      let i = 0;
      let access = false;
      while (i < this.products.length && !access) {
        if (this.products[i].id == product.id) {
          access = true;
        } else {
          i++;
        }
      }
      if (access) {
        this.products[i].quantity = this.products[i].quantity - 1;
        this.cartService.updateProduct(index, this.products[i]);
      }
    }
  }
  async getOption(productAux: Product) {
    try {
      const data = await this.optionService
        .getProductOptionsByTwo(productAux.latestID, productAux.optionSelected)
        .toPromise();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error obteniendo datos:', error);
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }
  formatNumber(numberAux: number) {
    return Number.isInteger(numberAux) ? numberAux : numberAux.toLocaleString();
  }
}
