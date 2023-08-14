import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductDialogComponent } from './components/product-dialog/product-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { MatDialog } from '@angular/material/dialog';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductDialogComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule
  ],
  providers: [
    MatDialog
  ]
})
export class ProductsModule { }
