import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';
import {OrolService} from '../../services/orol.service';
import {SpinnerService} from '../../services/spinner.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  profileForm: FormGroup;

  constructor(private fb: FormBuilder, public orolService: OrolService, private spinnerService:SpinnerService) {
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
      var user = JSON.parse(localStorage.getItem('User'));
    this.orolService.updateUser(this.profileForm.value).subscribe((data)=>{
      const User: any = {
        'id':user.id,
        'accessToken':user.accessToken,
        'firstName':this.profileForm.get('firstName').value,
        'lastName':this.profileForm.get('lastName').value,
        'phoneNumber':user.phoneNumber,
        'email':user.email,
      }
      localStorage.setItem('User', JSON.stringify(User));
      this.orolService.userDetailsSubject.next(User);
      this.spinnerService.setSpinner(false);
      console.log(data);
    });
  }
}
