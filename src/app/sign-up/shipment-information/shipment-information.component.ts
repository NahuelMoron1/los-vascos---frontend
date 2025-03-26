import { Component, OnInit, inject } from '@angular/core';
import { City } from 'src/app/models/City';
import { Province } from 'src/app/models/Province';
import { cityJSON } from 'src/app/models/cityJSON';
import { Userdata } from 'src/app/models/Userdata';
import { CityService } from 'src/app/services/city.service';
import { UserdataService } from 'src/app/services/userdata.service';
import { User } from 'src/app/models/User';
import { ProvinceService } from 'src/app/services/province.service';
import { ProvinceJSON } from 'src/app/models/provinceJSON';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shipment-information',
  templateUrl: './shipment-information.component.html',
  styleUrls: ['./shipment-information.component.css'],
})
export class ShipmentInformationComponent implements OnInit {
  userID: string = '';
  user: User = new User('', '', '', '');
  Country: string = 'Argentina';
  provinciaSeleccionada: string | null = null; // Inicializar como null o un valor adecuado
  userdataService = inject(UserdataService);
  cities: Array<City> = [];
  provinces: Array<Province> = [];
  searchTerm: string = '';
  saveData: boolean = false;
  cityService = inject(CityService);
  cityJSON: cityJSON = new cityJSON(0, []);
  dataCreated: boolean = false;
  ProvinceService = inject(ProvinceService);
  provinceJSON: ProvinceJSON = new ProvinceJSON(0, 0, [], [], 0);
  activeRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.provinciaSeleccionada = 'Ciudad Autónoma de Buenos Aires';

    this.ProvinceService.getProvinces().subscribe((data) => {
      this.provinceJSON = data;
      this.provinces = this.provinceJSON.provincias;
    });
  }
  selectOption(option: string): void {
    this.searchTerm = option; // Establece el valor del input al seleccionar una opción
    this.cities = [];
  }
  onProvinceChange() {
    this.cities = [];
    this.searchTerm = '';
  }

  updateSearchResults(): void {
    if (this.searchTerm != '') {
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

  async createUserData() {
    let id = this.generateRandomId(16);
    this.userID = this.activeRoute.snapshot.params['id'];
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
    let saveIt = 'true';
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
      this.userID,
      saveIt
    );
    await this.userdataService.saveUserdata(shipmentData).toPromise();
    this.dataCreated = true;
    this.enableOrDisableInputs();
    localStorage.setItem('dataCreated', JSON.stringify(true));

    localStorage.removeItem('userCreated');

    window.location.href = '';
  }
}
