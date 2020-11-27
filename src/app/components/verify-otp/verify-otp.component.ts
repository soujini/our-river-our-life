import { Component, OnInit, Input, Output, ViewChild, EventEmitter, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ng-uikit-pro-standard';
import { WindowService } from '../../services/window.service';
import * as firebase from 'firebase';
import { OrolService } from '../../services/orol.service';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOTPComponent implements AfterViewInit {
  windowRef: any;
  errorMessage: any;
  @ViewChild('otpModal') otpModal: ModalDirective;
  @Input() userName;
  @Output() isLogin = new EventEmitter();
  @Output() isVerifyOTP = new EventEmitter();
  public otp: number;

  constructor(private orolService: OrolService, private win: WindowService, private router: Router, private spinnerService: SpinnerService) { }
  ngAfterViewInit(): void {
    this.otpModal.show();
    console.log('userId is:', this.userName);
  }

  ngOnInit(): void {
    this.windowRef = this.win.windowRef;

  }
  onOtpChange(event) {
    this.otp = event;
  }
  verifyLoginCode() {
    this.spinnerService.setSpinner(true);
    this.windowRef.confirmationResult
      .confirm(this.otp)
      .then(result => {
        this.spinnerService.setSpinner(false);
        this.isVerifyOTP.emit(false);
        // this.router.navigate(['./home']);
        // this.login();
        this.getAccessToken("phone");
      })
      .catch(error => {
        this.spinnerService.setSpinner(false);
        this.errorMessage = "Incorrect code entered";
        console.log(error, "Incorrect code entered")
      });
  }


  getAccessToken(mode) {
    this.orolService.getAccessToken(this.userName, mode).subscribe((data) => {
      const User: any = {
        'id': data['user'].id,
        'accessToken': data['accessToken'],
        'firstName': data['user'].firstName,
        'lastName': data['user'].lastName,
        'phoneNumber': data['user'].phoneNumber,
        'email': data['user'].email,
      }
      localStorage.setItem('User', JSON.stringify(User));
      this.orolService.userDetailsSubject.next(JSON.stringify(User));

      if (data['user'].firstName == '' || data['user'].firstName == undefined || data['user'].lastName == '' || data['user'].lastName == undefined || data['user'].email == '' || data['user'].email == undefined) {
        ///route to edit profile page
        // alert("going to edit profile")
        this.router.navigate(['./edit-profile']);
        this.spinnerService.setSpinner(false);

      }
      else {
        this.router.navigate(['./home']);
        this.spinnerService.setSpinner(false);

      }
    });
  }


}
