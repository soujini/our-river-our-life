import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ng-uikit-pro-standard';
// import { RegisterComponent } from '../../components/register/register.component';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @ViewChild('phone') phone: ElementRef
  loginForm: FormGroup;
  userName :any = "";
  password :any = "";
  phoneNumber :any = "";
  isLogin =false;
  isRegister:boolean=false;
  isRecoverPassword:boolean=false;
  isVerifyOTP:boolean=false;

  loading = false;
  submitted = false;
  isEyeHidden:boolean=true;

  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute, private router: Router) { }

  ngOnInit()  {

  }

  setIsRegister(event){
    this.isRegister = event;
  }

  setIsRecoverPassword(event){
    this.isRecoverPassword = event;
  }
  setIsLogin(event){
    this.isLogin = event;
  }
  setisVerifyOTP(event){
    this.isVerifyOTP=event;
  }
  setUserName(event){
    this.userName=event;
  }
  setPassword(event){
    this.password=event;
  }
  setPhoneNumber(event){
    this.phoneNumber=event;
  }

}
