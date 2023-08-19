import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from '../../products.component';
import { ProductDialogComponent } from './product-dialog.component';



const routes: Routes = [
  {
    path: "",
    component: ProductsComponent,
    
  },
  {
    path: "addProduct",
    component: ProductDialogComponent
  },
  {
    path: "details",
    component: ProductDialogComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
