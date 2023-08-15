import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@Angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import { DisableControlDirective } from './directive/disable-control.directive';

const modules = [
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule,
  MatCardModule,
  MatIconModule,
  MatDialogModule,
  MatTableModule,
  MatButtonModule,
  NgxSpinnerModule,
  FormsModule,
  ReactiveFormsModule,
  MatStepperModule
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule ,
    ReactiveFormsModule,
    modules
  ],
  exports: [
    modules
  ],
  providers: []
})
export class SharedModule { }
