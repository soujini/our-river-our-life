import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild,NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ng-uikit-pro-standard';
import { AuthService } from "../../shared/services/auth.service";
import { WindowService } from '../../services/window.service';
import  * as firebase from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { SpinnerService } from '../../services/spinner.service';
import { OrolService } from '../../services/orol.service';



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

  constructor( public ngZone: NgZone,
    private win: WindowService,
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    private spinnerService: SpinnerService,
    public orolService:OrolService) {
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
          this.getAccessToken(userName, "email");
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
    getAccessToken(userName, mode){
      this.spinnerService.setSpinner(true);
      this.orolService.getAccessToken(userName, mode).subscribe((data)=>{
        const User: any = {
          'id':data['user'].id,
          'accessToken':data['accessToken'],
          'firstName':data['user'].firstName,
          'lastName':data['user'].lastName,
          'phoneNumber':data['user'].phoneNumber,
          'email':data['user'].email,
          'avatarURL':data['user'].avatarURL[0],
        }

        localStorage.setItem('User', JSON.stringify(User));
        this.orolService.userDetailsSubject.next(JSON.stringify(User));
      });
    }

    signInWithPhoneNumber(phone){
      this.spinnerService.setSpinner(true);
      var appVerifier = this.windowRef.recaptchaVerifier;
      this.afAuth.signInWithPhoneNumber("+91"+phone, appVerifier)
      .then(result => {
        this.orolService.signInPhone(phone).subscribe((res)=>{
          // localStorage.setItem('userId', res['id']);
        });
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

    onSubmit() {
      this.submitted = true;
      this.loading = true;
    }
    // toggleClientSecret(){
    //   // this.isEyeHidden = !this.isEyeHidden;
    // }
  }
