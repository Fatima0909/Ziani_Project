import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import firebase from 'firebase/app';
import { environment } from 'src/environments/environment';
import { AddCarComponent } from './add-car/add-car.component';


firebase.initializeApp(environment.firebase);
@NgModule({
  declarations: [
    AppComponent,
    AddCarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
