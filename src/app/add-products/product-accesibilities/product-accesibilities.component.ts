import { Component, Input } from '@angular/core';
import { Options } from 'src/app/models/Options';

@Component({
  selector: 'app-product-accesibilities',
  templateUrl: './product-accesibilities.component.html',
  styleUrls: ['./product-accesibilities.component.css'],
})
export class ProductAccesibilitiesComponent {
  @Input() onModify!: boolean;
  @Input() options!: Options[];
  @Input() optionSelected!: Options;
  @Input() optionTerm!: string;
  @Input() productID!: string;
}
