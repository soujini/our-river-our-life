import { Component, OnInit, Output, ViewChild, EventEmitter, AfterViewInit } from '@angular/core';
import { ModalDirective } from 'ng-uikit-pro-standard';
import { WindowService } from '../../services/window.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOTPComponent implements AfterViewInit {
  windowRef: any;
  errorMessage:any;
  @ViewChild('otpModal') otpModal: ModalDirective;
  @Output() isLogin = new EventEmitter();
  @Output() isVerifyOTP = new EventEmitter();
  public otp:number;

  constructor(private win: WindowService) { }
  ngAfterViewInit(): void {
    this.otpModal.show();
  }

  ngOnInit(): void {
    this.windowRef = this.win.windowRef;
  }
  onOtpChange(event){
    this.otp = event;
  }
  verifyLoginCode() {
    this.windowRef.confirmationResult
    .confirm(this.otp)
    .then( result => {
      console.log(result.user);
      // this.user = result.user;
      alert("otp verified");
    })
    .catch( error => {
      this.errorMessage="Incorrect code entered?";
      console.log(error, "Incorrect code entered?")
    });
  }

}
