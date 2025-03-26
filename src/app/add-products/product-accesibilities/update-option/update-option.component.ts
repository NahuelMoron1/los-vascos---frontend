import { Component, inject, Input } from '@angular/core';
import { SkyWaitService } from '@skyux/indicators';
import { Options } from 'src/app/models/Options';
import { OptionsService } from 'src/app/services/options.service';
import { WaitService } from 'src/app/services/wait.service';

@Component({
  selector: 'app-update-option',
  templateUrl: './update-option.component.html',
  styleUrls: ['./update-option.component.css'],
})
export class UpdateOptionComponent {
  @Input() optionSelected: Options = new Options('', '', '', 0, 0);
  @Input() optionTerm: string = '';
  @Input() options: Options[] = [];
  optionsSearched: Options[] = [];
  optionService = inject(OptionsService);
  waitSvc = inject(WaitService);

  updateSearchResults() {
    this.optionsSearched = [];
    if (this.optionTerm != '') {
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
  async modifyOptions(optionAux: Options, index: number) {
    this.waitSvc.displayWait(true);
    if (this.options.length > 0) {
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
    this.waitSvc.displayWait(false);
  }
  deleteOption(optionSelected: Options) {
    if (this.options.length > 0) {
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
  searchOptionByName(nameAux: string) {
    let i = 0;
    let access = false;

    while (i < this.options.length && !access) {
      if (this.options[i].name == nameAux) {
        access = true;
      } else {
        i++;
      }
    }
    if (access) {
      return this.options[i];
    } else {
      return this.optionSelected;
    }
  }
}
