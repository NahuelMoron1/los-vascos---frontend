import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent implements OnInit {
  productService = inject(ProductService);
  currentPage: number = 1;
  totalPages: number = 0;
  @Input() productsArray: Product[] = [];
  @Output() onModifyPage = new EventEmitter<boolean>(); // Output para emitir el valor
  async ngOnInit() {
    await this.readCounts('all', 'all');
  }
  async readCounts(value: string, type: string) {
    (await this.productService.readCounts(value, type)).subscribe((pages) => {
      this.totalPages = pages;
    });
    this.productService.getCurrentPage().subscribe((page) => {
      this.currentPage = page;
    });
  }
  async nextPage() {
    this.productService.setPageNumber(this.currentPage + 1);
    this.onModifyPage.emit(true);
    window.scrollTo(0, 500);
  }
  async previousPage() {
    if (this.currentPage > 1) {
      this.productService.setPageNumber(this.currentPage - 1);
      this.onModifyPage.emit(true);
      window.scrollTo(0, 500);
    }
  }
}
