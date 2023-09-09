import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import firebase from 'firebase/app';
import { environment } from 'src/environments/environment';
import { SpinnerComponent } from './spinner/spinner.component';
import { DetailsComponent } from './details/details.component';

import { FormsModule } from '@angular/forms'; // Importez FormsModule

firebase.initializeApp(environment.firebase);
@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule ,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
