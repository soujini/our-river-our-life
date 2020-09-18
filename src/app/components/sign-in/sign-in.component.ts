import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ng-uikit-pro-standard';
import { AuthService } from "../../shared/services/auth.service";
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements AfterViewInit {
  loginForm: FormGroup;

  @ViewChild('loginModal') loginModal: ModalDirective;
  submitted: boolean;
  loading: boolean;
  phone: any;
  errorMessage:any;
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
      this.loginForm = this.formBuilder.group({
        mobilenumber: ['', Validators.required],
        password: ['', Validators.required]
      });

      this.loginModal.show();
    }

    onKeyUp(e: any) {
      const value = this.phone.nativeElement.value
      if(!(/^\+[\d ]*$/.test(value))) {
        this.phone.nativeElement.value = value.slice(0, -1)
      }
    }

    onKey(e: any) {
      const value = this.phone.nativeElement.value
      if(e.which === 8) {
        return
      }

      const len = value.length
      if(len === 4 || len === 8 || len === 12) {
        this.phone.nativeElement.value = value + ' '
      }

      if(len >= 16) {
        e.preventDefault()
      }
    }
    onSubmit() {
      this.submitted = true;
      this.loading = true;
    }
//     this.loginModal.on('hidden.bs.modal', function (e) {
// alert("aasad");
// }));


    register() {
      // this.loginModal.hide();
      // this.isRegister=true;
      // this.registerModal.show();
      alert("in reg");
      setTimeout(() => {
        this.loginModal.hide();
        alert("sdasd")
      }, 3000);
    }

    toggleClientSecret(){
      // this.isEyeHidden = !this.isEyeHidden;
    }
  }
