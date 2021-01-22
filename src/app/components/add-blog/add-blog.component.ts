import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray,Validators } from '@angular/forms';

import { OrolService } from '../../services/orol.service';
import { SpinnerService } from '../../services/spinner.service';
import { NgxImageCompressService } from 'ngx-image-compress';
@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss']
})
export class AddBlogComponent implements OnInit {
  blogForm: FormGroup;
  public submitted: boolean = false;
  public imageFile: File;

  featuredAdditionalVideosArray: any = [];
  featuredAdditionalVideos = [];
  // featuredPhoto= "../../../assets/icons/marker.svg";
  imagefeaturedPhoto = [];
  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;
  featuredPhoto: string;
  featuredAdditionalPhotos = [];
  public imagefeaturedAdditionalPhotos: File[] = [];

  constructor(private fb: FormBuilder, private orolService: OrolService, private imageCompress: NgxImageCompressService,
    private spinnerService: SpinnerService) {
    this.createForm();
    this.featuredAdditionalVideosArray = this.blogForm.controls.featuredAdditionalVideos as FormArray;

  }

  ngOnInit(): void {
  }

  createForm() {
    var user = JSON.parse(localStorage.getItem('User'));
    this.blogForm = this.fb.group({
      templateType: ['', [Validators.required]],
      userId: [user.id],
      featuredTitle: ['',[Validators.required,Validators.maxLength(200)]],
      featuredDescription: ['',[Validators.required,Validators.maxLength(1000)]],
      featuredPhoto: this.fb.array([]),
      featuredAdditionalPhotos: this.fb.array([]),
      featuredVideo: [''],
      featuredAdditionalVideos: this.fb.array([]),
    });
  }

  addScreenshotURL() {
    if (this.featuredAdditionalVideosArray.length < 4) {
      this.featuredAdditionalVideosArray.push(new FormControl(''));
    }
  }
  removeScreenshotURL(index) {
    this.featuredAdditionalVideosArray.removeAt(index);
  }
  createblog() {
    this.submitted = true;
    this.orolService.createblog(this.blogForm.value, this.imageFile)

  }


  getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
  }
  onFeaturedAdditionalPhoto(event) {
    if (event.target.files && event.target.files[0]) {
      var length = event.target.files.length;
      for (let i = 0; i < event.target.files.length; i++) {
        this.imagefeaturedAdditionalPhotos.push(event.target.files[i]);
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.featuredAdditionalPhotos.push(event.target.result);
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
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

  compressFile() {
    var orientation = -1;
    this.imageCompress.uploadFile().then(({ image }) => {
      this.imgResultBeforeCompress = image;
      var filename = Date.now()+"-add-blog";
      this.imageCompress.compressFile(image, orientation, 50, 50).then(
        result => {
          this.imgResultAfterCompress = result;
          this.imageFile = this.dataURLtoFile(this.imgResultAfterCompress,filename);
        }
      );

    });
  }
  // onFeaturedPhoto(event) {
  //   if (event.target.files && event.target.files[0]) {
  //     var length = event.target.files.length;
  //     for (let i = 0; i < event.target.files.length; i++) {
  //       this.imagefeaturedPhoto.push(event.target.files[i]);
  //       var reader = new FileReader();
  //       reader.onload = (event: any) => {
  //        this.featuredPhoto = event.target.result;
  //       //  this.imageURL.push(event.target.result);
  //       }
  //       reader.readAsDataURL(event.target.files[i]);
  //     }
  //   }

  // }



}
