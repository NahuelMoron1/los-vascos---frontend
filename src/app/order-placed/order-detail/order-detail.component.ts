import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/models/Order';
import { OrderXproducts } from 'src/app/models/OrderXproduct';
import { Product } from 'src/app/models/Product';
import { PublicUser } from 'src/app/models/PublicUser';
import { User } from 'src/app/models/User';
import { Userdata } from 'src/app/models/Userdata';
import { CookieService } from 'src/app/services/cookie.service';
import { OrdersXProductsService } from 'src/app/services/orders-x-products.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductService } from 'src/app/services/product.service';
import { UserdataService } from 'src/app/services/userdata.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
})
export class OrderDetailComponent implements OnInit {
  productService = inject(ProductService);
  orderService = inject(OrdersService);
  orderXproductsService = inject(OrdersXProductsService);
  userdataService = inject(UserdataService);
  activeRoute = inject(ActivatedRoute);

  oxp: Array<OrderXproducts> = [];
  products: Array<Product> = [];
  order: Order = new Order(
    '',
    '',
    0,
    0,
    0,
    0,
    new Date(),
    '',
    '',
    false,
    '',
    '',
    ''
  );
  id: string = '';
  user: PublicUser = new PublicUser('', '', '', false); //USER va a ser el usuario logueado en el momento
  admin: PublicUser = new PublicUser('', '', '', false); //USER va a ser el usuario logueado en el momento
  userdata: Userdata = new Userdata(
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    0,
    '',
    'false'
  ); //USERDATA va aser la informacion de envio DEL USUARIO LOGUEADO
  router = inject(Router);
  cookieService = inject(CookieService);

  async ngOnInit(): Promise<void> {
    (await this.cookieService.getUser()).subscribe((data) => {
      this.user = data;
    });
    (await this.cookieService.getAdmin()).subscribe((data) => {
      this.admin = data;
    });
    this.id = this.activeRoute.snapshot.params['id'];
    await this.getOXP();
    await this.getProducts();
    let orderAux = await this.getOrder();
    if (orderAux != undefined) {
      this.order = orderAux;
      if (!this.isAdmin()) {
        this.checkOrderByUser();
      }
    }
    await this.getUserData();
    (await this.cookieService.getAdmin()).subscribe((data) => {
      this.admin = data;
    });
  }
  checkOrderByUser() {
    /* Con esta funcion se verifica que la orden creada pertenezca al usuario logueado */
    if (this.order.userID == this.user.id) {
      //Se comparan los dos ID, el ID de usuario que tiene la orden y el ID del usuario logueado
      return true; //Si los ID coinciden, se devuelve verdadero
    } else {
      //Si los ID no coinciden entra aca, funciona como GUARD, por si el usuario de alguna forma tiene el ID de la orden, pero no esta logueado o no es una orden creada por el mismo, que no lo deje hacer nada sin antes loguearse o loguearse con el usuario que haya creado la orden, es mas tema de seguridad
      this.router.navigate(['/']); //Se envia al usuario al menu principal
      return false;
    }
  }
  async getOrder() {
    /* La funcion se conecta directamente con el servicio de ordenes para leer la base de datos 
  y traer la orden que tenga el ID que se encuentra en la ruta de la pagina */
    try {
      const data = await this.orderService.getOrder(this.id).toPromise();
      return data;
    } catch (error) {
      console.error('Error obteniendo datos:', error);
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }
  async getProducts(): Promise<void> {
    /* La funcion se conecta con el servicio de productos para leer la base de datos y traer los productos que pertenezcan a la orden creada */
    let cartAux = localStorage.getItem('cartResolved');
    if (cartAux) {
      this.products = JSON.parse(cartAux);
    }
    localStorage.removeItem('cartResolved');
    /*try {
    for(let i=0; i<this.oxp.length; i++){
      let productAux: Product | undefined;
      productAux = await this.productService.getProduct(this.oxp[i].productId).toPromise();
      if(productAux){
        productAux.quantity = this.oxp[i].quantity;
        this.products.push(productAux);
      }
    }
  } catch (error) {
    console.error('Error obteniendo datos:', error);
    throw error; // Puedes manejar el error de acuerdo a tus necesidades
  }*/
  }
  async getOXP() {
    (await this.orderXproductsService.readOxp(this.id)).subscribe((data) => {
      this.oxp = data;
    });
  }

  async getUserData() {
    (await this.userdataService.returnUserID(this.order.userdataId)).subscribe(
      (data) => {
        this.userdata = data;
      }
    );
  }
  isAdmin() {
    return this.admin.email != '';
  }
}
