import { Component, OnInit, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/products.inteface';
import { CardComponent } from './components/card/card.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ CardComponent ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  products: Product[] = [];
  productService = inject(ProductsService);

  ngOnInit(): void {
    this.productService.getAll().subscribe((products) => {
      this.products = products;
    })
    
  }
}
