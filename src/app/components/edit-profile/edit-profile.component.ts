import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  profileForm: FormGroup;

  constructor(private fb: FormBuilder,) {
    this.createForm();
  }


  ngOnInit(): void {
    // this.profileForm.valueChanges.subscribe(val=>{
    // });
  }

  createForm() {
    this.profileForm = this.fb.group({
      firstName:[''],
      lastName:[''],
      email:['joshi.paritosh07@gmail.com'],
      mobileNumber:['9548214301'],
      password:['pari@123'],
    });
  }

  getUser(){

  }

  updateUser(){

  }

}
