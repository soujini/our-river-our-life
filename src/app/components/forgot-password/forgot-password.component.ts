import { AfterViewInit, Component, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ng-uikit-pro-standard';
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements AfterViewInit {
  successMessage:string="";
  errorMessage:string=""
  @ViewChild('recoverModal') recoverModal: ModalDirective;
  @Output() isRecoverPassword = new EventEmitter();
  @Output() isRegister = new EventEmitter();
  @Output() isLogin = new EventEmitter();

  constructor( public authService: AuthService) { }

  ngAfterViewInit(): void {
    this.recoverModal.show();
    this.isLogin.emit(false);
  }
  closeRecoverModal(){
    this.isRecoverPassword.emit(false);
    this.isLogin.emit(false);
  }
  forgotPassword(email){
    this.authService.ForgotPassword(email).then(() => {
      this.successMessage = 'Password reset email sent, check your inbox.';
      setTimeout(() => {
        this.successMessage ="";
        this.isRecoverPassword.emit(false);
      }, 3000);
    }).catch((error) => {
      this.errorMessage = error.message;
    })
  }
  login(){
    this.isRecoverPassword.emit(false);
    this.isLogin.emit(true);
  }
}
