import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { OrolService } from '../../services/orol.service';
import { SpinnerService } from '../../services/spinner.service';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  profileForm: FormGroup;
  public imageFile: File;
  imageURL:any = "../../assets/icons/profile.png";
  show: boolean = false;
  images = [];
  submitted: boolean = false;
  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;

  constructor(private fb: FormBuilder, private imageCompress: NgxImageCompressService, public orolService: OrolService, private spinnerService: SpinnerService) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getUser();
  }

  createForm() {
    this.profileForm = this.fb.group({
      id: [],
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      phoneNumber: ['', [Validators.required]],
      avatarURL: this.fb.array([]),
    });
  }
  validate() {
    this.submitted = true;
    if (this.profileForm.get('firstName').valid &&
      this.profileForm.get('lastName').valid &&
      this.profileForm.get('phoneNumber').valid &&
      this.profileForm.get('email').valid
      // && this.imageFile.length > 0
    ) {
      this.updateProfile();
    }
  }
  async updateProfile() {
    await this.orolService.updateProfile(this.profileForm.value, this.imageFile);
    this.show = false;
    this.images = [];

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
  getUser() {
    this.orolService.getUser().subscribe((data) => {
      if (JSON.stringify(data) != '{}') {
        this.imgResultAfterCompress = data['avatarURL'][0];
        this.profileForm.patchValue({
          id: data['id'],
          firstName: data['firstName'],
          lastName: data['lastName'],
          email: data['email'],
          phoneNumber: data['phoneNumber'],
          // avatarURL:data.avatarURL[0],
        });
      }
      else {

      }
    });
  }
  compressFile() {
    var orientation = -1;
    this.imageCompress.uploadFile().then(({ image }) => {
      this.imgResultBeforeCompress = image;
      console.log('Size in bytes was:', this.imageCompress.byteCount(image));
      this.imageCompress.compressFile(image, orientation, 50, 50).then(
        result => {
          this.imgResultAfterCompress = result;
          console.log('Size in bytes is now:', this.imageCompress.byteCount(result));
          this.imageFile = this.dataURLtoFile(this.imgResultAfterCompress, "Test");
        }
      );
    });
  }

  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
  //old update
  updateUser() {
    var user = JSON.parse(localStorage.getItem('User'));
    this.orolService.updateUser(this.profileForm.value).subscribe((data) => {
      const User: any = {
        'id': user.id,
        'accessToken': user.accessToken,
        'firstName': this.profileForm.get('firstName').value,
        'lastName': this.profileForm.get('lastName').value,
        'phoneNumber': user.phoneNumber,
        'email': user.email,
        'avatarURL': user.avatarURL ? user.avatarURL[0] : [],

      }
      localStorage.setItem('User', JSON.stringify(User));
      this.orolService.userDetailsSubject.next(User);
      this.spinnerService.setSpinner(false);
    });

  }
}
