import { Component, OnInit, inject } from '@angular/core';
import { Brand } from 'src/app/models/Brand';
import { PublicUser } from 'src/app/models/PublicUser';
import { BrandsService } from 'src/app/services/brands.service';
import { CookieService } from 'src/app/services/cookie.service';
import { WaitService } from 'src/app/services/wait.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-brands-data',
  templateUrl: './brands-data.component.html',
  styleUrls: ['./brands-data.component.css'],
})
export class BrandsDataComponent implements OnInit {
  loading: boolean = false;
  brandService = inject(BrandsService);
  waitService = inject(WaitService);
  cookieService = inject(CookieService);
  admin: PublicUser = new PublicUser('', '', '', false);
  brandsArray: Array<Brand> = [];
  bffurl = environment.endpoint;
  async ngOnInit() {
    this.waitService.displayWait(true);
    await this.readBrands();
    (await this.cookieService.getAdmin()).subscribe((data) => {
      this.admin = data;
    });
    this.waitService.displayWait(false);
  }
  async readBrands() {
    const brandsAux = await this.getBrands();
    if (brandsAux != undefined) {
      for (let i = 0; i < brandsAux.length; i++) {
        this.brandsArray.push(brandsAux[i]);
      }
    }
  }
  async getBrands() {
    try {
      const data = await this.brandService.getBrands().toPromise();
      console.log(data?.length);
      return data;
    } catch (error) {
      console.error('Error obteniendo datos:', error);
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }
  async deleteBrand(brandID: string) {
    this.waitService.displayWait(true);
    if (this.admin.email !== '') {
      await this.brandService.deleteBrand(brandID).toPromise();
    }
    this.waitService.displayWait(false);
    location.reload();
  }
}
