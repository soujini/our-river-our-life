import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild,NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ng-uikit-pro-standard';
import { AuthService } from "../../shared/services/auth.service";
import { WindowService } from '../../services/window.service';
import * as firebase from 'firebase';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements AfterViewInit {
  windowRef: any;
  // loginForm: FormGroup;

  @ViewChild('loginModal') loginModal: ModalDirective;
  submitted: boolean;
  loading: boolean;
  phone: any;
  errorMessage:any;
  mode:any="invalid";
  showPassword:boolean = false;

  appVerifier:any;
  @Output() isRegister = new EventEmitter();
  @Output() isLogin = new EventEmitter();
  @Output() isRecoverPassword = new EventEmitter();
  @Output() isVerifyOTP = new EventEmitter();
  @Output() userName = new EventEmitter();
  @Output() password = new EventEmitter();
  @Output() phoneNumber = new EventEmitter();
  loginBtnText:string="Send OTP"

  constructor( public ngZone: NgZone, private win: WindowService, public authService: AuthService,private formBuilder: FormBuilder,private route: ActivatedRoute,
    private router: Router,public afs: AngularFirestore,
    public afAuth: AngularFireAuth, private spinnerService: SpinnerService) {
      this.authService.errorMessage.subscribe(data => {
        this.errorMessage=data;
      });
    }

    ngOnInit(){
      this.windowRef = this.win.windowRef;
      this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
      // this.windowRef.recaptchaVerifier = this.afAuth.recaptchaVerifier('recaptcha-container');

      // this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      //   "recaptcha-container",
      //   {
      //     size: "invisible",
      //     callback: function(response) {
      //       alert("oh ho");
      //     }
      //   }
      // );
      //
      this.windowRef.recaptchaVerifier.render();
    }

    ngAfterViewInit(): void {
      this.loginModal.show();
    }

    signIn(userName:string, password?:string, phoneNumber?:string){
      this.spinnerService.setSpinner(true);
      this.submitted=true;
      if(this.mode == "phone"){
        this.signInWithPhoneNumber(userName);
      }
      else if(this.mode == "email"){
        this.signInWithEmailAndPassword(userName, password);
      }

    }
    signInWithEmailAndPassword(userName:String, password?:string){
      this.authService.SignIn(userName, password).then((result) => {
        if(result.user.emailVerified == true){
          this.spinnerService.setSpinner(false);
          this.ngZone.run(() => {
            this.router.navigate(['home']);
            this.isLogin.emit(false);
          });
          // this.SetUserData(result.user);
        }
        else{
          this.spinnerService.setSpinner(false);
          this.errorMessage = "Please check your email inbox for a verification email.";
        }

      }).catch((error) => {
        this.spinnerService.setSpinner(false);
        this.errorMessage = error.message;
      });
    }

    signInWithPhoneNumber(phone){
      this.spinnerService.setSpinner(true);
      var appVerifier = this.windowRef.recaptchaVerifier;
      this.afAuth.signInWithPhoneNumber("+91"+phone, appVerifier)
      .then(result => {
        this.spinnerService.setSpinner(false);
        this.windowRef.confirmationResult = result;
        this.userName.emit(phone);
        this.isVerifyOTP.emit(true);
        this.isLogin.emit(false);
      })
      .catch( error => {
        this.spinnerService.setSpinner(false);
        console.log(error)
        this.errorMessage = error.message;
      });
    }

    forgotPassword(){
      this.isRecoverPassword.emit(true);
      this.isLogin.emit(false);
    }
    register(){
      this.isRegister.emit(true);
      this.isLogin.emit(false);
    }
    validate(event){
      if(this.validateUsername(event) == true){
        if(this.mode == 'phone'){
          this.loginBtnText="SEND OTP";
          this.showPassword=false;
          this.errorMessage="";
        }
        else if(this.mode == 'email'){
          this.loginBtnText="LOGIN";
          this.showPassword=true;
          this.errorMessage="";
        }
      }
      else{
        if(this.mode == 'invalid'){
          this.loginBtnText="SEND OTP";
          this.showPassword=false;
          this.errorMessage = "Please enter a valid mobile number or email"
        }
      }
    }
    validateUsername(event){
      var phonePattern = /^\d{10}$/;
      if(event.target.value.match(phonePattern)){
        this.errorMessage="";
        this.mode="phone";
        return true;
      }
      else{
        this.mode="email";
        var emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(event.target.value.match(emailPattern)){
          this.errorMessage="";
          this.mode="email";
          return true;
        }
        else{
          this.mode = "invalid";
          return false;
        }
      }
    }
    // onKeyUp(e: any) {
    //   alert("wah")
    //   const value = e.target.value
    //   if(!(/^\+[\d ]*$/.test(value))) {
    //     this.phone.nativeElement.value = value.slice(0, -1)
    //   }
    // }
    //
    // onKey(e: any) {
    //   alert("here");
    //   const value = e.target.value
    //   if(e.which === 8) {
    //     return
    //   }
    //
    //   const len = value.length
    //   if(len === 4 || len === 8 || len === 12) {
    //     this.phone.nativeElement.value = value + ' '
    //   }
    //
    //   if(len >= 16) {
    //     e.preventDefault()
    //   }
    // }
    onSubmit() {
      this.submitted = true;
      this.loading = true;
    }

    // register() {
    //   this.isRegister.emit(true);
    //   this.isLogin.emit(false);
    // }

    toggleClientSecret(){
      // this.isEyeHidden = !this.isEyeHidden;
    }
  }
