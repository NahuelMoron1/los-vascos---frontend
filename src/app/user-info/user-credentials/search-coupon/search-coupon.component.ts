import { Component, inject, OnInit } from '@angular/core';
import { Cupon } from 'src/app/models/Cupon';
import { CouponService } from 'src/app/services/coupon.service';

@Component({
  selector: 'app-search-coupon',
  templateUrl: './search-coupon.component.html',
  styleUrls: ['./search-coupon.component.css']
})
export class SearchCouponComponent implements OnInit{
  notFound: boolean = false;
  couponService = inject(CouponService);
  couponSearched: Cupon = new Cupon('','',0,new Date(), false, 0);
  coupons: Array<Cupon> = [];

  async ngOnInit() {
      (await this.couponService.readCoupons()).subscribe(result => {
        this.coupons = result;
      });
      this.sortCouponsByExpiration();
      this.coupons.reverse();
  }
  async searchCoupon(){
    let inpAux = document.getElementById('couponNameInp') as HTMLInputElement;
    if(inpAux){
      let input = inpAux.value;
      this.couponSearched = await this.couponService.searchCoupon(input);
      if(this.couponSearched.id != ''){
        window.location.href = `/coupons/${this.couponSearched.id}`;
      }else{
        this.notFound = true;
      }
    }
  }

  sortCouponsByExpiration(): void {
    this.coupons.sort((a, b) => {
      const dateA = new Date(a.expires);
      const dateB = new Date(b.expires);
      return dateA.getTime() - dateB.getTime(); // Ordena en forma ascendente
    });
  }

  getDate(isoDate: Date){
    const date = new Date(isoDate);

// Obtener día, mes y año
const day = date.getUTCDate().toString().padStart(2, '0'); // Asegura que tenga dos dígitos
const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Los meses empiezan desde 0
const year = date.getUTCFullYear().toString();

// Formatear como dd/mm/aaaa
const formattedDate = `${day}/${month}/${year}`;

return formattedDate;
  }

  expired(dateAux: Date){
    let today = new Date();
    let expireDate = new Date(dateAux);
    if(today < expireDate){
      return true;
    }else{
      return false;
    }
  }
}
