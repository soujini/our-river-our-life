import { Injectable, NgZone } from '@angular/core';
import { User } from "../services/user";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { SpinnerService } from '../../services/spinner.service';
import { OrolService } from '../../services/orol.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public errorMessageSubject = new BehaviorSubject("");
  errorMessage = this.errorMessageSubject.asObservable();
  userData: any; // Save logged in user data

  constructor(
    // private win: WindowService,
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone,
    public orolService:OrolService,
    public spinnerService:SpinnerService
    // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        // localStorage.setItem('user', JSON.stringify(this.userData));
        // JSON.parse(localStorage.getItem('user'));
      } else {
        // localStorage.setItem('user', null);
        // JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Sign up with email/password (Sign up to firebase and save user details in the user table)
  SignUp(email, password, phoneNumber, firstName, lastName) {
    this.spinnerService.setSpinner(true);
    return this.afAuth.createUserWithEmailAndPassword(email, password)
    .then(u => {
      this.orolService.signInWeb(email, phoneNumber, firstName, lastName);// Save Data in the User Table
        this.SendVerificationMail();
        // this.SetUserData(result.user);
        this.spinnerService.setSpinner(false);
      // localStorage.setItem('phone', phoneNumber);
    })
    .catch(error => {
      this.spinnerService.setSpinner(false);
      switch (error.code) {
        case 'auth/email-already-in-use':
        this.errorMessageSubject.next(`Email address ${email} already in use.`);
        break;
        case 'auth/invalid-email':
        this.errorMessageSubject.next(`Email address ${email} is invalid.`);
        break;
        case 'auth/operation-not-allowed':
        this.errorMessageSubject.next(`Error during sign up.`);
        break;
        case 'auth/weak-password':
        this.errorMessageSubject.next('Password is not strong enough. Add additional characters including special characters and numbers.');
        break;
        default:
        this.errorMessageSubject.next(error.message);
        break;
      }});
    }
    // .then((result) => {
    //   localStorage.setItem('phone', phoneNumber);
    //   /* Call the SendVerificaitonMail() function when new user sign
    //   up and returns promise */
    //   // this.orolService.signIn(email, phoneNumber).subscribe((res)=>{
    //   //   localStorage.setItem('userId', res.id);
    //   // });
    //   this.SendVerificationMail();
    //   this.SetUserData(result.user);
    //     this.spinnerService.setSpinner(false);
    // }).catch((error) => {
    //     this.spinnerService.setSpinner(false);
    //   this.errorMessageSubject.next(error.message);
    // })

  // Send email verfificaiton when new user sign up
  async SendVerificationMail() {
    return (await this.afAuth.currentUser).sendEmailVerification()
    .then(() => {
      this.errorMessageSubject.next("Please check your email inbox for a verification email and login again.");
      // window.alert("Please check your email to verify")
      // this.router.navigate(['verify-email-address']);
    })
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail);

  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
      this.ngZone.run(() => {
        this.router.navigate(['home']);
      })
      // this.SetUserData(result.user);
    }).catch((error) => {
      this.errorMessageSubject.next(error);
    })
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('User');
      this.orolService.userDetailsSubject.next({});
    })
  }
}
