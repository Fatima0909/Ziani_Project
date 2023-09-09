import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MatNativeDateModule } from '@angular/material/core';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  }
];




@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    RouterModule.forChild(routes),
    MatNativeDateModule,
    MatDatepickerModule
  ]
})
export class HomeModule { }
