import { Component, inject, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/Brand';
import { BrandsService } from 'src/app/services/brands.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-branches-menu',
  templateUrl: './branches-menu.component.html',
  styleUrl: './branches-menu.component.css',
})
export class BranchesMenuComponent implements OnInit {
  brands?: Brand[];
  bffurl?: string;
  brandService = inject(BrandsService);
  async ngOnInit() {
    this.bffurl = environment.endpoint;
    (await this.brandService.readBrands()).subscribe((brands) => {
      this.brands = brands;
    });
  }
}
