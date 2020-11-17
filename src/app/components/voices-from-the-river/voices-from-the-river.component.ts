import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ModalDirective } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-voices-from-the-river',
  templateUrl: './voices-from-the-river.component.html',
  styleUrls: ['./voices-from-the-river.component.scss']
})
export class VoicesFromTheRiverComponent implements OnInit {
  @ViewChild('previewVideoURLModal') previewVideoURLModal: ModalDirective;

  blogForm: FormGroup;
  AdditionalVideoArray:any=[];
  featuredVideo = []
  public imageFile: File[] = [];
  imageURL: any = [];
  images = [];
  trustedVideoURL:any;

  featuredPhoto = [];
  public imagefeaturedPhoto: File[] = [];

  featuredAdditionalPhotos = [];
  public imagefeaturedAdditionalPhotos: File[] = [];

  constructor(private fb: FormBuilder,private sanitizer: DomSanitizer,) {
    this.createForm();
    this.AdditionalVideoArray = this.blogForm.controls.featuredAdditionalVideos as FormArray;

  }

  ngOnInit(): void {
  }

  createForm() {
    this.blogForm = this.fb.group({
      userId: [],
      featuredTitle: [''],
      featureDescription: [''],
      featuredPhoto: this.fb.array([]),
      featuredAdditionalPhotos: this.fb.array([]),
      featuredVideo: this.fb.array([]),

      featuredAdditionalVideos: this.fb.array([]),
    });
  }



  createblog() {
    console.log(this.blogForm);
  }

 previewVideoUrl(){
      const videoId=this.getId(this.blogForm.get('featuredAdditionalVideos').value);
      this.trustedVideoURL="'//www.youtube.com/embed/"+ videoId +"'";
      this.trustedVideoURL=this.sanitizer.bypassSecurityTrustResourceUrl(this.trustedVideoURL.replace(/\'/gi,''));

      this.previewVideoURLModal.show();
    }
    removeScreenshotURL(index){
      this.AdditionalVideoArray.removeAt(index);
    }

    getId(url) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);

      return (match && match[2].length === 11)
      ? match[2]
      : null;
    }

  onFeaturedPhoto(event) {
    if (event.target.files && event.target.files[0]) {
      var length = event.target.files.length;
      for (let i = 0; i < event.target.files.length; i++) {
        this.imageFile.push(event.target.files[i]);
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.imageURL = event.target.result;
          // this.image.push(event.target.result);
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }

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


}
