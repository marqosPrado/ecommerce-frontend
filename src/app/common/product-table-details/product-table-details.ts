import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-product-table-details',
  imports: [],
  templateUrl: './product-table-details.html',
  styleUrl: './product-table-details.css'
})
export class ProductTableDetails {
  @Input() product!: Product;
}
