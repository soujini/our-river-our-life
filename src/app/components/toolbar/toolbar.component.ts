import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ng-uikit-pro-standard';
import { RegisterComponent } from '../../components/register/register.component';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @ViewChild('phone') phone: ElementRef
  @ViewChild('loginModal') loginModal: ModalDirective;
  @ViewChild('registerModal', { static: true }) registerModal: ModalDirective
  loginForm: FormGroup;
  isRegister:boolean=false;
  loading = false;
  submitted = false;
  isEyeHidden:boolean=true;

  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute, private router: Router) { }

  ngOnInit()  {
    this.loginForm = this.formBuilder.group({
      mobilenumber: ['', Validators.required],
        password: ['', Validators.required]
    });
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


register() {
  this.loginModal.hide();
  this.isRegister=true;
  this.registerModal.show();

  setTimeout(() => {
    this.loginModal.hide();
  }, 3000);
}

 toggleClientSecret(){
    this.isEyeHidden = !this.isEyeHidden;
  }

}
