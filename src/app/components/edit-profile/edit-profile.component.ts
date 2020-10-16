import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  profileForm: FormGroup;

  // constructor(private fb: FormBuilder) {
  //   this.createForm();

  //  }
  constructor(private fb: FormBuilder,) {
      this.createForm();
    }


  ngOnInit(): void {
  }
  createForm() {
    this.profileForm = this.fb.group({
      firstName:['Paritosh'],
      lastName:['Joshi'],
      email:['joshi.paritosh07@gmail.com'],
      mobileNumber:['9548214301'],
      password:['pari@123'],
    });
  }


}
