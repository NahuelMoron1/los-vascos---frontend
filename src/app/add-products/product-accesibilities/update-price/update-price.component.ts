import { Component, inject, Input } from '@angular/core';
import { SkyWaitService } from '@skyux/indicators';
import { Options } from 'src/app/models/Options';
import { OptionsService } from 'src/app/services/options.service';
import { WaitService } from 'src/app/services/wait.service';

@Component({
  selector: 'app-update-price',
  templateUrl: './update-price.component.html',
  styleUrls: ['./update-price.component.css'],
})
export class UpdatePriceComponent {
  @Input() options: Options[] = [];
  @Input() onModify: boolean = false;
  waitSvc = inject(WaitService);
  optionService = inject(OptionsService);

  async changePrices(increase: boolean) {
    this.waitSvc.displayWait(true);
    let inpAux = document.getElementById('percentageInp') as HTMLInputElement;
    if (inpAux) {
      let percentage = parseFloat(inpAux.value);
      if (inpAux.value.length > 0) {
        if (percentage > 0 && percentage < 100) {
          let confirmed = confirm(
            'Cambiar los precios en ' + percentage + '% ?'
          );
          if (confirmed) {
            await this.modifyPrices(percentage, increase);
          }
        } else {
          alert('El porcentaje de cambio debe ser mayor a 0 y menor que 100');
        }
      } else {
        alert('No podes dejar el campo vacio');
      }
    } else {
      alert('No podes dejar el campo vacio');
    }
    this.waitSvc.displayWait(false);
  }
  async modifyPrices(percentage: number, increase: boolean) {
    for (let i = 0; i < this.options.length; i++) {
      if (increase) {
        this.options[i].price =
          this.options[i].price + (this.options[i].price * percentage) / 100;
      } else {
        this.options[i].price =
          this.options[i].price - (this.options[i].price * percentage) / 100;
      }
      await this.optionService.updateOneOption(
        i,
        this.options[i],
        this.options[i].id
      );
    }
  }
}
