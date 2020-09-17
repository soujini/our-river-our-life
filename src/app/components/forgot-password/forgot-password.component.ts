import { AfterViewInit, Component, Output, ViewChild } from '@angular/core';
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
  @ViewChild('recoverModal') recoverModal: ModalDirective;

  constructor( public authService: AuthService) { }

  ngAfterViewInit(): void {
    this.recoverModal.show();

  }

}
