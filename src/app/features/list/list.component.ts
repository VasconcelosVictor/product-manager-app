import { Component, OnInit, inject, signal } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { Product } from '../../shared/interfaces/products.inteface';
import { ProductsService } from '../../shared/services/products.service';
import { CardComponent } from './components/card/card.component';
import { filter } from 'rxjs';
import { ConfirmationDialogService } from '../../shared/services/confirmation-dialog.service';
import { NoItemsComponent } from './components/no-items/no-items.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent,
    RouterLink,
    MatButtonModule,
    NoItemsComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  products = signal<Product[]>(
    // inject(ActivatedRoute).snapshot.data['products']
    []
  )
   ;

  productService = inject(ProductsService);
  router = inject(Router);
  matDialog = inject(MatDialog);
  confirmationDialogService = inject(ConfirmationDialogService);


  onEdit(product: Product) {
    this.router.navigate(['/edit-product', product.id]);
  }

  onDelete(product: Product) {
    this.confirmationDialogService
    .openDialog()
    .pipe(filter((anwser) => anwser === true))
    .subscribe(() => {
      this.productService.delete(product.id).subscribe(() => {
        this.productService.getAll().subscribe((products) => {
          this.products.set(products);
        })

      });

    })
  }
}
