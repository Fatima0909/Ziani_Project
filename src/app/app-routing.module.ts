import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './auth-guard.guard';

const routes: Routes = [
  
  {
    path: "home",
    loadChildren: () => import('./home/home.module').then(m=> m.HomeModule)
  },
  {
    path: "login",
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: "dashboard",
    loadChildren: () => import('./products/products.module').then(m =>m.ProductsModule),
    canActivate: [AuthGuardGuard] 
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
