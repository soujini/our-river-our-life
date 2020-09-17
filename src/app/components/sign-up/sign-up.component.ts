import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ng-uikit-pro-standard';
import { AuthService } from "../../shared/services/auth.service";
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements AfterViewInit {
  
  @ViewChild('registerModal') public registerModal: ModalDirective;
  registerForm: any;

  constructor( public authService: AuthService,private formBuilder: FormBuilder,private route: ActivatedRoute, 
    private router: Router) { }

  ngAfterViewInit(): void {
       this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobilenumber: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  this.registerModal.show();
  }


}
