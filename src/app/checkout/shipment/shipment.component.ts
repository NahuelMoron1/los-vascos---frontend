import { Component, OnInit, inject } from '@angular/core';
import { City } from 'src/app/models/City';
import { Province } from 'src/app/models/Province';
import { PublicUser } from 'src/app/models/PublicUser';
import { User } from 'src/app/models/User';
import { Userdata } from 'src/app/models/Userdata';
import { cityJSON } from 'src/app/models/cityJSON';
import { ProvinceJSON } from 'src/app/models/provinceJSON';
import { CityService } from 'src/app/services/city.service';
import { CookieService } from 'src/app/services/cookie.service';
import { ProvinceService } from 'src/app/services/province.service';
import { UserdataService } from 'src/app/services/userdata.service';
import { WaitService } from 'src/app/services/wait.service';

@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.css'],
})
export class ShipmentComponent implements OnInit {
  city: string = 'Mar Del Plata';
  province: string = 'Buenos Aires';
  Country: string = 'Argentina';
  dataCreated: boolean = false;
  waitSvc = inject(WaitService);
  userdataService = inject(UserdataService);
  user: PublicUser = new PublicUser('', '', '', false);
  userdata?: Userdata;
  cityService = inject(CityService);
  cityJSON: cityJSON = new cityJSON(0, []);
  cities: Array<City> = [];
  allCities: Array<City> = [];
  ProvinceService = inject(ProvinceService);
  provinceJSON: ProvinceJSON = new ProvinceJSON(0, 0, [], [], 0);
  provinces: Array<Province> = [];
  provinciaSeleccionada?: string; // Inicializar como null o un valor adecuado
  searchTerm: string = '';
  cookieService = inject(CookieService);

  async ngOnInit() {
    try {
      (await this.cookieService.getUser()).subscribe((data) => {
        this.user = data;
      });
      await this.getUserData();
      this.getAndSetProvinces();
    } catch (err: any) {
      return;
    }
  }

  getAndSetProvinces() {
    this.ProvinceService.getProvinces().subscribe((data) => {
      this.provinceJSON = data;
      this.provinces = this.provinceJSON.provincias;
    });
    if (this.userdata?.email !== '') {
      this.provinciaSeleccionada = this.userdata?.province;
    } else {
      this.provinciaSeleccionada = 'Ciudad Autónoma de Buenos Aires';
    }
  }

  updateSearchResults(): void {
    if (this.searchTerm != '' && this.provinciaSeleccionada) {
      this.cityService
        .getCities(this.provinciaSeleccionada, this.searchTerm)
        .subscribe((data) => {
          this.cityJSON = data;
          console.log(this.cityJSON);
          this.cities = this.cityJSON.localidades;
        });
    } else {
      this.cities = [];
    }
  }

  onProvinceChange() {
    this.cities = [];
    this.searchTerm = '';
  }

  selectOption(option: string): void {
    this.searchTerm = option; // Establece el valor del input al seleccionar una opción
    this.cities = [];
  }

  enableOrDisableInputs() {
    const shipmentInputs = document.querySelectorAll('.shipmentInput');
    shipmentInputs.forEach((input) => {
      if (this.dataCreated) {
        input.setAttribute('disabled', 'disabled');
      } else {
        input.removeAttribute('disabled');
      }
    });
  }

  getValue(name: string) {
    if (name != '' && this.userdata != undefined) {
      switch (name) {
        case 'firstname':
          return this.userdata.firstname;

        case 'lastname':
          return this.userdata.lastname;

        case 'company':
          return this.userdata.company;

        case 'phone':
          return this.userdata.phone;

        case 'email':
          return this.userdata.email;

        case 'street':
          return this.userdata.street;

        case 'streetNumb':
          return this.userdata.streetNumb;

        case 'city':
          return this.userdata.city;

        case 'province':
          return this.userdata.province;

        case 'saveIt':
          return this.userdata.saveIt;
      }
      return '';
    } else {
      return '';
    }
  }

  getString(name: string) {
    let inpAux = document.getElementById(name) as HTMLInputElement;
    let input: string = '';
    if (inpAux) {
      input = inpAux.value;
    }
    return input;
  }
  getNumber(name: string) {
    let inpAux = document.getElementById(name) as HTMLInputElement;
    let input: number = 0;
    if (inpAux) {
      input = parseInt(inpAux.value);
    }
    return input;
  }

  generateRandomId(length: number = 16): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
  generateValues() {
    let id;
    if (!this.userdata) {
      id = this.generateRandomId(16);
    } else {
      id = this.userdata.id;
    }
    let firstname = this.getString('firstNameInp');
    let lastname = this.getString('lastNameInp');
    let company = this.getString('companyInp');
    let phone = this.getString('phoneInp');
    let email = this.getString('emailInp');
    let address = this.getString('streetInp');
    let addressNumb = this.getNumber('streetNumInp');
    let city = this.getString('cityInp');
    let province = '';
    if (this.provinciaSeleccionada) {
      province = this.provinciaSeleccionada;
    }
    let countryAux = 'Argentina';
    const shipmentData: Userdata = new Userdata(
      id,
      firstname,
      lastname,
      company,
      phone,
      email,
      countryAux,
      province,
      city,
      address,
      addressNumb,
      this.user.id,
      'true'
    );
    return shipmentData;
  }

  createUserData() {
    this.waitSvc.displayWait(true);
    const shipmentData = this.generateValues();
    if (this.userdata) {
      this.userdataService
        .updateUserdata(shipmentData.id, shipmentData)
        .subscribe(() => {});
    } else {
      this.userdataService.saveUserdata(shipmentData).subscribe(() => {});
    }
    this.dataCreated = true;
    this.enableOrDisableInputs();
    localStorage.setItem('dataCreated', JSON.stringify(true));
    this.waitSvc.displayWait(false);
  }
  async deleteUserData() {
    ///const data = await this.userdataService.deleteUserdata(this.userID).toPromise();
    this.dataCreated = false;
    this.enableOrDisableInputs();
    localStorage.removeItem('dataCreated');
  }
  async getUserData() {
    try {
      (await this.userdataService.returnUserdata(this.user.id)).subscribe(
        (data) => {
          this.userdata = data;
          if (this.userdata.email !== '') {
            this.dataCreated = true;
            localStorage.setItem('dataCreated', JSON.stringify(true));
            this.enableOrDisableInputs();
          }
        }
      );
    } catch (err: any) {
      return;
    }
  }
}
