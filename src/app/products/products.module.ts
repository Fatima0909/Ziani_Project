import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductDialogComponent } from './components/product-dialog/product-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { DisableControlDirective } from '../shared/directive/disable-control.directive';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductDialogComponent,
    DisableControlDirective
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  providers: [
    MatDialog
  ]
})
export class ProductsModule { }
