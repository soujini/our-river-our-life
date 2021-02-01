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
  reports: any = [];
  pageNumber = 1;
  note=".jpg, .jpeg, .png, files accepted";
  info = "(Max. size 100KB)";
  isLargeImageFile=false;
  isInvalidImageFile=false;
  constructor(private fb: FormBuilder, private imageCompress: NgxImageCompressService, public orolService: OrolService, private spinnerService: SpinnerService) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getUser();
    this.getWaterTestDetails();

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
       && this.imageFile != null
    ) {
      this.updateProfile();
    }
  }
  async updateProfile() {
    await this.orolService.updateProfile(this.profileForm.value, this.imageFile);
    this.show = false;
    this.images = [];
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
        });
      }
      else {

      }
    });
  }
  deleteImage(){
    this.isLargeImageFile=false;
    this.isInvalidImageFile=false;
    this.submitted = true;
    this.imageFile=null;
    this.imgResultAfterCompress=this.imageURL;
  }

  compressFile() {
    this.isLargeImageFile=false;
    this.isInvalidImageFile=false;
    var user = JSON.parse(localStorage.getItem('User'));
    var orientation = -1;
    this.imageCompress.uploadFile().then(({ image }) => {
      this.imgResultBeforeCompress = image;
      this.imageCompress.compressFile(image, orientation, 50, 50).then(
        result => {
          this.imgResultAfterCompress = result;
          this.imageFile = this.dataURLtoFile(this.imgResultAfterCompress, "avatar_"+user.id);
          console.log(this.imageFile);
          var type = this.imageFile.type.split('/');
          alert(type[1]);
          if(type[1] == "jpeg" || type[1] == "jpg" || type[1] == "png"){
          if(this.imageFile.size > 100000){//250kb (in bytes)
            this.isLargeImageFile=true;
            // this.deleteImage();
          }
        }
        else{

          this.isInvalidImageFile=true;
        }
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
  onScroll() {
    this.pageNumber = this.pageNumber + 1;
  }
  getWaterTestDetails() {
    var user = JSON.parse(localStorage.getItem('User'));
    this.spinnerService.setSpinner(true);
    this.orolService.getWaterTestDetails().subscribe((data) => {
      if (data['count']) {
        this.reports = data['rows'].filter(r => r.userId == user.id);
      }
      this.spinnerService.setSpinner(false);
    });
  }
}
