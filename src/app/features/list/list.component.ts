import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatDialog, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { Router, RouterLink } from "@angular/router";
import { Product } from '../../shared/interfaces/products.inteface';
import { ProductsService } from '../../shared/services/products.service';
import { CardComponent } from './components/card/card.component';
import { filter } from 'rxjs';

@Component({
  selector: 'dialog-animations-example-dialog',
  template:`
  <h2 mat-dialog-title>Deletar Produto</h2>
    <mat-dialog-content>
      Tem Certeza que quer deletar esse produto?
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onNo()">Nao</button>
      <button mat-raised-button color="primary"  (click)="onYes()" cdkFocusInitial>Sim</button>
    </mat-dialog-actions> `,
  standalone: true,
  imports: [MatButtonModule,MatDialogModule],
})
export class ConfirmationDialogComponent {
  matDialogRef = inject(MatDialogRef);

  onNo(){
    this.matDialogRef.close(false);
  }

  onYes(){
    this.matDialogRef.close(true);
  }

}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  products: Product[] = [];
  productService = inject(ProductsService);
  router = inject(Router);
  matDialog = inject(MatDialog);

  ngOnInit(): void {
    this.productService.getAll().subscribe((products) => {
      this.products = products;
    })

  }

  onEdit(product: Product) {
    this.router.navigate(['/edit-product', product.id]);
  }

  onDelete(product: Product) {
    this.matDialog.open(ConfirmationDialogComponent)
    .afterClosed()
    .pipe(filter((answer) => answer === true ))
    .subscribe((anwser: boolean) => {
      this.productService.delete(product.id).subscribe(() => {
        this.productService.getAll().subscribe((products) => {
          this.products = products;
        })

      });
      console.log('afterClosed', anwser);
    })
  }
}
