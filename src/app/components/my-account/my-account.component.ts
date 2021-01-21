import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray,Validators } from '@angular/forms';
import {OrolService} from '../../services/orol.service';
import {SpinnerService} from '../../services/spinner.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  profileForm: FormGroup;
  public imageFile: File[]=[];
  imageURL:any = "../../assets/icons/profile.png";
  show: boolean = false;
  images = [];
  submitted: boolean = false;

  constructor(private fb: FormBuilder, public orolService: OrolService, private spinnerService:SpinnerService) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getUser();
  }

  createForm() {
    this.profileForm = this.fb.group({
      id:[],
      firstName:['', [Validators.required]],
      lastName:[''],
      email:['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      phoneNumber:['' ,[Validators.required]],
      avatarURL: this.fb.array([]),
    });
  }
  validate() {
    this.submitted = true;
    if (this.profileForm.get('firstName').valid &&
      this.profileForm.get('lastName').valid &&
      this.profileForm.get('phoneNumber').valid &&
      this.profileForm.get('email').valid &&
      this.imageFile.length > 0
    ) {
      this.updateProfile();
    }
  }
  async updateProfile() {

    await this.orolService.updateProfile(this.profileForm.value, this.imageFile);
    this.show = false;
    this.images=[];
    this.imageFile=[];

    // var user = JSON.parse(localStorage.getItem('User'));
    // this.orolService.updateProfile(this.profileForm.value,this.imageFile).subscribe((data)=>{
    //   const User: any = {
    //     'id':user.id,
    //     'accessToken':user.accessToken,
    //     'firstName':this.profileForm.get('firstName').value,
    //     'lastName':this.profileForm.get('lastName').value,
    //     'phoneNumber':user.phoneNumber,
    //     'email':user.email,
    //     'avatarURL' : user.avatarURL ? user.avatarURL[0] : [],

    //   }

}
  getUser(){
    this.orolService.getUser().subscribe((data)=>{
      if(JSON.stringify(data) != '{}')
      {
        this.imageURL = data['avatarURL'][0];
        this.profileForm.patchValue({
          id:data['id'],
          firstName:data['firstName'],
          lastName:data['lastName'],
          email:data['email'],
          phoneNumber:data['phoneNumber'],
          // avatarURL:data.avatarURL[0],
        });
      }
      else{

      }
    });
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var length = event.target.files.length;
      for (let i = 0; i < event.target.files.length; i++) {
        this.imageFile.push(event.target.files[i]);
        var reader = new FileReader();
        reader.onload = (event:any) => {
          this.imageURL = event.target.result;
          // this.image.push(event.target.result);
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }

  }

//old update
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
        'avatarURL' : user.avatarURL ? user.avatarURL[0] : [],

      }
      localStorage.setItem('User', JSON.stringify(User));
      this.orolService.userDetailsSubject.next(User);
      this.spinnerService.setSpinner(false);
    });

  }
}
