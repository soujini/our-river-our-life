import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NavbarModule, WavesModule, ButtonsModule } from 'ng-uikit-pro-standard'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from "../../shared/services/auth.service";
import { OrolService } from "../../services/orol.service";
import { ModalDirective } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @ViewChild('phone') phone: ElementRef
  loginForm: FormGroup;
  name: any = "";
  userName: any = "";
  password: any = "";
  phoneNumber: any = "";
  isLogin = false;
  isRegister: boolean = false;
  isRecoverPassword: boolean = false;
  isVerifyOTP: boolean = false;
  loading = false;
  submitted = false;
  isEyeHidden: boolean = true;
  isGetInvolved: boolean = false;
  avatarURL: String = "../../assets/icons/profile.png";
  public user;

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    private orolService: OrolService,
    private authService: AuthService
  ) {
    this.orolService.userDetailsSubject.subscribe(data => {
      if (JSON.stringify(data) === '{}') {
        this.name = "";
        this.avatarURL = "../../assets/icons/profile.png";
      }
      else {

        var user = JSON.parse(localStorage.getItem('User'));
        this.user = user;

        if (user.firstName != undefined) {
          this.name = user.firstName + ' ' + user.lastName;
          this.avatarURL = user.avatarURL;
        }
        else {
          this.name = "+91" + user.phoneNumber;
          this.avatarURL = "../../assets/icons/profile.png";
        }
      }

    });
  }


  ngOnInit() {
    // var user = JSON.parse(localStorage.getItem('User'));
    // if(user){
    //   this.avatarURL = user.avatarURL;
    // }
  }

  gotoBlogPosts() {
    this.router.navigate([`/blog`]);
  }

  setIsRegister(event) {
    this.isRegister = event;
  }

  setIsRecoverPassword(event) {
    this.isRecoverPassword = event;
  }
  setIsLogin(event) {
    this.isLogin = event;
  }
  setisVerifyOTP(event) {
    this.isVerifyOTP = event;
  }
  setUserName(event) {
    this.userName = event;
  }
  setPassword(event) {
    this.password = event;
  }
  setPhoneNumber(event) {
    this.phoneNumber = event;
  }
  logout() {
    this.authService.SignOut();
  }

}
