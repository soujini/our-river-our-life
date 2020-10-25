import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  profileForm: FormGroup;

<<<<<<< HEAD
=======
 
>>>>>>> 4a3733f4229d073b20b584841e12f2e4ee761275
  constructor(private fb: FormBuilder,) {
    this.createForm();
  }


  ngOnInit(): void {
<<<<<<< HEAD

=======
    this.profileForm.valueChanges.subscribe(val=>{
    });
>>>>>>> 4a3733f4229d073b20b584841e12f2e4ee761275
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
