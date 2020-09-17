import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef,ModalDirective } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit  {
  @ViewChild('registerModal') registerModal: ModalDirective;

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  isRegister:boolean=false;
  phone: any;
  // registerModal: any;
  constructor(public modalRef: MDBModalRef,
      private formBuilder: FormBuilder,
      private router: Router,) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobilenumber: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  // this.registerModal.show();
  }

 

  onSubmit() {
      this.submitted = true;
      this.loading = true;
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
}

