import { Injectable } from '@angular/core';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { Car } from '../model/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  addCarData(carToSave: Car) {
    return firebase.database().ref('cars').push(carToSave);
  }

  constructor() { }

  getCars() {
    return firebase.database().ref("cars");
  }
}
