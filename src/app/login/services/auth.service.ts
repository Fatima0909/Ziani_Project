import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EmailPasswordCredentials } from '../models/emailpasswordcredentials';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { Constants } from '../models/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated(): boolean  {
    if (!this.currentAuthKey) {
      return false;
    }
    return true;
    
  }

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private authKeySubject ;
  public authKey: Observable <string>;
  private signOutSubject: BehaviorSubject<boolean>;
  public signOutListener: Observable<boolean>;
  constructor() {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem(Constants.LOC_OWNER_DATA)!)
    );
    this.currentUser = this.currentUserSubject.asObservable();
    this.authKeySubject = new BehaviorSubject<string>( JSON.parse(localStorage.getItem(Constants.LOC_OWNER_AUTH_KEY)!));
    this.authKey = this.authKeySubject.asObservable();
    this.signOutSubject = new BehaviorSubject<boolean>(false);
    this.signOutListener = this.signOutSubject.asObservable();

  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }



  public get currentAuthKey(): string {
    return this.authKeySubject.value;
  }

  public setCurrentUserValue(owner: any) {
    this.currentUserSubject.next(owner);
  }

  public setCurrentSignOutValue(isSignIn: any) {
    this.signOutSubject.next(isSignIn);
  }

  setKeyAuth(authUser: any) {
    this.authKeySubject.next(authUser);
  }

  

  logout() {
    this.signOut().then(res => {
      this.signOutSubject.next(true);
    });
  }
  private signOut() {
    return firebase.auth().signOut();
  }

  emailPwSignUp(emailPw: EmailPasswordCredentials) {
    return firebase.auth().createUserWithEmailAndPassword(emailPw.email, emailPw.password)
  }



  addOwnerData(owner:any, uid: any) {
    console.log('uid', uid, owner)
    return firebase.database().ref('users').child(uid).set(owner);
  }

  public initPasswardMail(emailAddress: any, actionCodeSettings: any) {
    return firebase.auth().sendPasswordResetEmail(emailAddress, actionCodeSettings);
  }

  public googleLogin() {
    return new firebase.auth.GoogleAuthProvider();
  }
  phoneLogin() {
    return new firebase.auth.PhoneAuthProvider();
  }
  public oAuthLogin(provider: any) {
    return firebase.auth().signInWithPopup(provider);
  }

  public findOwnerByOwnerId(userAuthId: string) {
    return firebase.database().ref('users/' + userAuthId);
  }

  public updateOwnerData(ownerDataToUpade: any, ownerId: any): any {
    return firebase.database().ref(`users/${ownerId}`).update(ownerDataToUpade);
  }

  public emailPwpLogin(emailpasswordcredentials: EmailPasswordCredentials) {
    return firebase.auth().signInWithEmailAndPassword(emailpasswordcredentials.email, emailpasswordcredentials.password);
  }

  public getOwner(uid: string ) {
    return firebase.database().ref('users/' + uid);
  }


  public getRandomKeyStorage(random: string) {
    return firebase.database().ref(`randomKeyStorage/`).push(random).key;
  }

  public addOwnerFamilyDataGetRef(ownerId: string) {
    return firebase.database().ref(`users/${ownerId}/families`).push();
  }
  removeOwnerFamilyDataGetRef(ownerId: string, owner: any) {
    return firebase.database().ref(`users/${ownerId}`).update(owner);
  }
  public addOwnerFamilyData(ref: any, familyToAdd: any, ownerId: string): any {
    familyToAdd.updateDateTime = new Date().getTime();
    return ref.set(familyToAdd);
  }


  public updateOwnerFamilyData(familyToUpdate: any, ownerId: string, familyId: string) {
    familyToUpdate.updateDateTime = new Date().getTime();
    return  firebase.database().ref(`users/${ownerId}/families/${familyId}`).update(familyToUpdate);
  }


  getError(error: any) {
    /*const language = this.translate.currentLang;
    if(language === Constants.LANGUAGE_CODE_FRENCH){
      return  Constants.NEW_ACCOUNT_MSG_MAP.get(error.code);
    }else if(language === Constants.LANGUAGE_CODE_ENGLISH) {
      return  Constants.NEW_ACCOUNT_MSG_MAP_EN.get(error.code);
    } else {
      return  Constants.NEW_ACCOUNT_MSG_MAP_AR.get(error.code);

    }*/
    return Constants.NEW_ACCOUNT_MSG_MAP.get(error.code);
  }


  phoneValidation(phone:string, capVerif: any) {
    return firebase.auth().signInWithPhoneNumber(phone, capVerif);

  }

  addPlannerData(planner: any, spaceId: any) {
    return firebase.database().ref('planners/' + spaceId).push(planner);
  }

  public updatePlannerData(plannerDataToUpade: any, plannerId: any, spaceOwnerId: any): any {
    return firebase.database().ref(`planners/${spaceOwnerId}/${plannerId}`).update(plannerDataToUpade);
  }

  public findOwnerByMail(ownerMail: string) {
    return firebase.database().ref('users/').orderByChild('ownerMail').equalTo(ownerMail);
  }

  public addConsultationData(consultation: any, owner: any) {
    return firebase.database().ref('consultations').child(owner).set(consultation);
  }

  signInWithPhone(phone: string, recaptcha: any) {
    return   firebase.auth().signInWithPhoneNumber(phone, recaptcha);
  }

  getPhoneAuthProvider(verificationId: string, code: string) {
    return firebase.auth.PhoneAuthProvider.credential(verificationId, code)
  }

  signInWithCredential(credential: firebase.auth.AuthCredential) {
    return firebase.auth().signInWithCredential(credential);
  }

  getCurrentUser() {
    return firebase.auth().currentUser;
  }

}
