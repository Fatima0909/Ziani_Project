import { Injectable } from '@angular/core';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor() { }

  getCars() {
    return firebase.database().ref("cars");
  }
}
