import { Component, Injectable, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Observable, filter } from 'rxjs';
import { ProductsService } from './products.service';


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

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {
  matDialog = inject(MatDialog);

  constructor() { }

  openDialog(): Observable<boolean> {
    return this.matDialog
    .open(ConfirmationDialogComponent)
    .afterClosed()
  }
}
