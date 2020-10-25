import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';
import {OrolService} from '../../services/orol.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  profileForm: FormGroup;

  constructor(private fb: FormBuilder, public orolService: OrolService) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getUser();
  }

  createForm() {
    this.profileForm = this.fb.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      phoneNumber:[''],
    });
  }

  getUser(){
    this.orolService.getUser().subscribe((data)=>{
      if(JSON.stringify(data) != '{}')
      {
        this.profileForm.patchValue({
          firstName:data['firstName'],
          lastName:data['lastName'],
          email:data['email'],
          phoneNumber:data['phoneNumber'],
        });
      }
      else{

      }
    });
  }

  updateUser(){
    this.orolService.updateUser().subscribe((data)=>{
      console.log(data);
    });
  }
}
