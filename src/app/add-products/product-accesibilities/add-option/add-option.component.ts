import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { SkyWaitService } from '@skyux/indicators';
import { Options } from 'src/app/models/Options';
import { OptionsService } from 'src/app/services/options.service';
import { WaitService } from 'src/app/services/wait.service';

@Component({
  selector: 'app-add-option',
  templateUrl: './add-option.component.html',
  styleUrls: ['./add-option.component.css'],
})
export class AddOptionComponent {
  optionService = inject(OptionsService);
  private waitSvc = inject(WaitService);
  @Input() productID: string = ''; // Input para recibir el ID
  addOption() {
    this.waitSvc.displayWait(true);
    let optionName = this.getString('optionInp');
    let optionStock = this.getNumber('stockInp');
    let optionPrice = this.getNumber('costPriceInp');
    if (optionName.length > 0) {
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
    this.waitSvc.displayWait(false);
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
}
