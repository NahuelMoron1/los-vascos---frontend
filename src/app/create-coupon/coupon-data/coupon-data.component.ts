import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cupon } from 'src/app/models/Cupon';
import { CouponService } from 'src/app/services/coupon.service';

@Component({
  selector: 'app-coupon-data',
  templateUrl: './coupon-data.component.html',
  styleUrls: ['./coupon-data.component.css']
})
export class CouponDataComponent implements OnInit{
  couponService = inject(CouponService);
  saved: boolean = false;
  activeRoute = inject(ActivatedRoute);
  couponID: string = '';
  couponSearched: Cupon = new Cupon('','',0,new Date(), false, 0);
  modify: boolean = false;
  modificate: boolean = false;
  modified: boolean = false;
  async ngOnInit() {
    this.modify = await this.onModify();
  }
  async modifyCoupon(){
    let couponAux = this.generateNewCoupon();
    if(couponAux){
      try{
        await this.couponService.updateCoupon(couponAux.id, couponAux).toPromise();
      }catch(error){
        console.log(error);
      }
    }
    this.modificate = false;
    this.modified = true;
  }
  async onModify(){
    if (this.activeRoute.snapshot.params.hasOwnProperty('id')) { //Se comprueba que la ruta contenga el ID del producto a modificar
      this.couponID = this.activeRoute.snapshot.params['id'];
      try{
        this.couponSearched = await this.couponService.readCoupon(this.couponID);
        return true;
      }catch(error){
        console.log(error);
      }
    }
    return false;
  }
  async deleteCoupon(){
    if (this.activeRoute.snapshot.params.hasOwnProperty('id')) { //Se comprueba que la ruta contenga el ID del producto a modificar
      this.couponID = this.activeRoute.snapshot.params['id'];
      try{
        await this.couponService.deleteCoupon(this.couponID).toPromise();
      }catch(error){
        console.log(error);
      }
    }
  }
  getValue(name: string){
    switch(name){
      case 'code':
        return this.couponSearched.code;
      case 'price':
        return this.couponSearched.percentage;
      case 'minimum':
        return this.couponSearched.minimum;
      case 'expires':
        return this.formatDate(this.couponSearched.expires.toString());
      default:
        return 0;
    }
  }
  formatDate(date: string): string {
    const d = new Date(date);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }
  getString(name: string){
    let inpAux = document.getElementById(name) as HTMLInputElement;
    let input = "";
    if(inpAux){
      input = inpAux.value;
    }
    return input;
  }

  getDate(name: string){
    let inpAux = document.getElementById(name) as HTMLInputElement;
    let input = new Date();
    if(inpAux){
      input = new Date(inpAux.value);
    }
    return input;
  }

  getNumber(name: string){
    let inpAux = document.getElementById(name) as HTMLInputElement;
    let input = 0;
    if(inpAux){
      input = parseFloat(inpAux.value);
    }
    return input;
  }

  async createCoupon(){
    const coupon = this.generateNewCoupon();
    await this.couponService.saveCoupon(coupon).toPromise();
    this.saved = true;
  }
  generateRandomId(length: number = 16): string { //Genera un codigo random de 16 caracteres y lo devuelve. Sirve para los ID
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}
  generateNewCoupon(){
    if(this.couponID == ''){
      this.couponID = this.generateRandomId(16);
    }
    let code = this.getString('couponNameInp');
    let price = this.getNumber('couponPriceInp')
    let minimum = this.getNumber('couponMinInp')
    let expiration = this.getDate('couponExpInp');

    let newCoupon = new Cupon(this.couponID, code, price, expiration, false, minimum);

    return newCoupon;
  }
}
