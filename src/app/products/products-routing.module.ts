import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDialogComponent } from './components/product-dialog/product-dialog.component';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  {
    path: "",
    component: ProductsComponent,
    
  },
  {
    path: "addProduct",
    component: ProductDialogComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
