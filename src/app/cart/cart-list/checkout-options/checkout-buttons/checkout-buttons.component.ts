import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cupon } from 'src/app/models/Cupon';
import { Order } from 'src/app/models/Order';
import { PublicUser } from 'src/app/models/PublicUser';
import { User } from 'src/app/models/User';
import { UserXcoupon } from 'src/app/models/UserXcoupon';
import { CartService } from 'src/app/services/cart.service';
import { CookieService } from 'src/app/services/cookie.service';
import { CouponService } from 'src/app/services/coupon.service';
import { OrdersService } from 'src/app/services/orders.service';
import { UserXcouponService } from 'src/app/services/user-xcoupon.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout-buttons',
  templateUrl: './checkout-buttons.component.html',
  styleUrls: ['./checkout-buttons.component.css'],
})
export class CheckoutButtonsComponent implements OnInit {
  orderService = inject(OrdersService);
  couponService = inject(CouponService);
  cartService = inject(CartService);
  cookieService = inject(CookieService);
  userXcouponService = inject(UserXcouponService);
  userXcoupon: UserXcoupon = new UserXcoupon('', '', '');
  couponSearched: Cupon = new Cupon('', '', 0, new Date(), false, 0);
  router = inject(Router);
  user: PublicUser = new PublicUser('', '', '', false);
  applied: boolean = false;
  used: boolean = false;
  notfound: boolean = false;
  expired: boolean = false;
  minimum: boolean = false;
  total: number = 0;
  islogged: boolean = false;
  async ngOnInit() {
    (await this.cookieService.getUser()).subscribe((data) => {
      this.user = data;
    });
    this.cartService.getTotal().subscribe((result) => {
      this.total = result;
    });
  }
  async verifyOrders() {
    if (this.user.email != '') {
      if (this.user.client == true) {
        this.router.navigate(['/checkout']);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo salió mal!',
          footer:
            'Parece que no estas habilitado para realizar compras, ponete en contacto con nuestro soporte',
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo salió mal!',
        footer: 'Parece que no iniciaste sesión',
      });
      this.router.navigate(['/login']);
    }
    /*let existanceID = await this.hasOrder();
    if(existanceID != ""){
      this.router.navigate([`/checkout/orderExist/${existanceID}`]);
    }else{
      this.router.navigate(['/checkout']);
    }*/
  }
  async applyCoupon() {
    let codeAux = document.getElementById('couponInp') as HTMLInputElement;
    if (codeAux) {
      let input = codeAux.value;
      if (input != '') {
        try {
          this.couponSearched = await this.couponService.searchCoupon(input);
          // Código que quieres ejecutar después de obtener el resultado
          console.log(
            'Se ha obtenido el userXcoupon y el código sigue ejecutándose.'
          );
        } catch (error) {
          console.error('Error al obtener el userXcoupon:', error);
          this.couponSearched = new Cupon('', '', 0, new Date(), false, 0);
        }
        if (this.couponSearched.id != '') {
          if (await this.validateCoupon(this.couponSearched)) {
            this.cartService.setDiscount(this.couponSearched.percentage);
            this.setCouponApplied(this.couponSearched);
          }
        } else {
          this.notfound = true;
          this.applied = false;
          this.used = false;
        }
      }
    }
  }
  async validateCoupon(couponAux: Cupon) {
    this.clearInput('couponInp');
    let currentDate = new Date();
    let expiresDate = new Date(couponAux.expires);
    try {
      this.userXcoupon = await this.userXcouponService.readUser(
        this.user.id,
        couponAux.id
      );
      // Código que quieres ejecutar después de obtener el resultado
      console.log(
        'Se ha obtenido el userXcoupon y el código sigue ejecutándose.'
      );
    } catch (error) {
      console.error('Error al obtener el userXcoupon:', error);
    }
    if (this.userXcoupon.id != '') {
      couponAux.used = true;
    }
    if (couponAux.used) {
      this.applied = false;
      this.notfound = false;
      this.used = true;
      this.minimum = false;
      this.expired = false;
      return false;
    } else {
      if (expiresDate > currentDate) {
        if (couponAux.minimum <= this.total) {
          localStorage.setItem('coupon', couponAux.id);
          this.applied = true;
          this.used = false;
          this.notfound = false;
          return true;
        } else {
          this.applied = false;
          this.used = false;
          this.notfound = false;
          this.minimum = true;
          return false;
        }
      } else {
        this.expired = true;
        this.applied = false;
        this.used = false;
        this.notfound = false;
        this.minimum = false;
        return false;
      }
    }
  }
  setCouponApplied(couponAux: Cupon) {
    couponAux.used = true;
    this.couponService.updateCouponService(couponAux);
  }
  //async hasOrder(){
  /* La funcion se encarga de comprobar que al momento de realizar el pedido no exista otra orden/pedido del usuario sin finalizar,
    si la orden existe va a devolver el ID de la orden, si no existe devolverá un texto vacio. Para verificar si existe o no alguna 
    orden, se lee la lista de ordenes de la base de datos y se guarda la orden en un arreglo (aunque solo deberia ser 1 orden) y se
    busca el id de la orden. */
  /*let id: string = "";
    const orders: Array<Order> = await this.readOrders();
    if(orders.length>0){
      id = orders[0].id;
    }
    return id;
  }*/
  async readOrders() {
    /* La funcion va a encargarse de esperar mediante un await a la funcion de getOrders, si esa funcion retorna correctamente los
    valores, deberia pasar la verificacion de si es distinto de undefined, y si entra, recorrerá el arreglo auxiliar que tiene los
    valores retornados y los agregará al arreglo de ordenes que luego se retornará. */
    const ordersAux = await this.getOrders();
    const orders: Array<Order> = [];
    if (ordersAux != undefined) {
      for (let i = 0; i < ordersAux.length; i++) {
        orders.push(ordersAux[i]);
      }
    }
    return orders;
  }
  async getOrders() {
    /* La funcion se conecta directamente con la base de datos a traves del servicio orderService para leer las ordenes almacenadas. */
    try {
      const data = await this.orderService.getOrders().toPromise();
      console.log(data?.length);
      return data;
    } catch (error) {
      console.error('Error obteniendo datos:', error);
      throw error; // Se maneja el error de acuerdo a las necesidades que se requieran en el momento
    }
  }
  clearInput(name: string) {
    const inputElement = document.getElementById(name) as HTMLInputElement;
    if (inputElement) {
      inputElement.value = ''; // Limpiamos el valor del input
    }
  }
}
