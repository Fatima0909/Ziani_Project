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
import { PictureCarouselComponent } from '../picture-carousel/picture-carousel.component';
import { MatSelectModule } from '@angular/material/select';
import { SpinnerComponent } from '../spinner/spinner.component';
import { YearPickerComponent } from './components/year-picker/year-picker.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

const modules = [
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule,
  MatCardModule,
  MatSelectModule,
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
    PictureCarouselComponent,
    SpinnerComponent,
    YearPickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule ,
    ReactiveFormsModule,
    modules,
    MatNativeDateModule,
    MatDatepickerModule
  ],
  exports: [
    modules,
    PictureCarouselComponent,
    SpinnerComponent,
    YearPickerComponent
  ],
  providers: []
})
export class SharedModule { }
