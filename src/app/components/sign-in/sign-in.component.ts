import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ng-uikit-pro-standard';
import { AuthService } from "../../shared/services/auth.service";
// import { WindowService } from '../../services/window.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements AfterViewInit {
  // loginForm: FormGroup;

  @ViewChild('loginModal') loginModal: ModalDirective;
  submitted: boolean;
  loading: boolean;
  phone: any;
  errorMessage:any;
  mode:any="phone";
  showPassword:boolean = false;
  showOTP:boolean = false;

  @Output() isRegister = new EventEmitter();
  @Output() isLogin = new EventEmitter();
  @Output() isRecoverPassword = new EventEmitter();

  constructor( public authService: AuthService,private formBuilder: FormBuilder,private route: ActivatedRoute,
    private router: Router) {
      this.authService.errorMessage.subscribe(data => {
        this.errorMessage=data;
      });
    }

    ngAfterViewInit(): void {
      // this.windowRef = this.win.windowRef;
      // this.loginForm = this.formBuilder.group({
      //   mobilenumber: ['', Validators.required],
      //   password: ['', Validators.required]
      // });

      this.loginModal.show();
    //
    //   window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')
    //
    // window.recaptchaVerifier
    //               .render()
    //               .then( widgetId => {
    //
    //                 window.recaptchaWidgetId = widgetId
    // });
    }

    signIn(userName:string){
      //     const appVerifier = window.recaptchaVerifier;
      // alert("signIn");
      // alert(this.mode);
      // this.signInWithPhoneNumber(userName, appVerifier);
      // // this.authService.SignIn(userName, userPassword);
    }
    // signInWithPhoneNumber(phone){
      // const appVerifier = this.windowRef.recaptchaVerifier;
  //     window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
  // 'size': 'normal',
  // 'callback': function(response) {
  //   alert("reCAPTCHA solved, allow signInWithPhoneNumber.");
  //   // ...
  // },
  // 'expired-callback': function() {
  //   alert("Response expired. Ask user to solve reCAPTCHA again.");
  //   //
  //   // ...
  // }
// });
      // this.authService.signInWithPhoneNumber("+91"+phone, appVerifier);
      //verify mobile and send otp to mobile.
    // }

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
          this.showPassword=false;
          this.showOTP=true;
          this.errorMessage="";
        }
        else if(this.mode == 'email'){
          this.showPassword=true;
          this.errorMessage="";
        }
      }
      else{
         if(this.mode == 'invalid'){
          this.showPassword=false;
          this.errorMessage = "Please enter a valid mobile number or email"
        }
      }
      //  this.validateUsername(event);
      // if(this.mode == 'phone'){
      //   this.showPassword=false;
      //   this.showOTP=true;
      //   this.errorMessage="";
      // }
      // else if(this.mode == 'email'){
      //   this.showPassword=true;
      //   this.errorMessage="";
      // }

    }

     validateUsername(event){
      var phonePattern = /^\d{10}$/;
      if(event.target.value.match(phonePattern)){
      this.errorMessage="";
        return true;

      }
      else{
        this.mode="email";
        var emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(event.target.value.match(emailPattern)){
          this.errorMessage="";
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
