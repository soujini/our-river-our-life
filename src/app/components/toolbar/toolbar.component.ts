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
  // @ViewChild('loginModal') loginModal: ModalDirective;
  // @ViewChild('registerModal', { static: true }) registerModal: ModalDirective
  loginForm: FormGroup;
  isRegister:boolean=false;
  isRecoverPassword:boolean=false;

  loading = false;
  submitted = false;
  isEyeHidden:boolean=true;
  isLogin =false;
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

}
