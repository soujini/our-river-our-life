import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';
import { OrolService } from '../../services/orol.service';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss']
})
export class AddBlogComponent implements OnInit {
  blogForm: FormGroup;
  public submitted:boolean=false;

  featuredAdditionalVideosArray:any=[];
  featuredAdditionalVideos= [];
  featuredPhoto= "../../../assets/scalable-vector-graphics/flood-watch.svg";
  public imagefeaturedPhoto: File[] = [];

  featuredAdditionalPhotos = [];
  public imagefeaturedAdditionalPhotos: File[] = [];

  constructor(private fb: FormBuilder, private orolService: OrolService,
    private spinnerService: SpinnerService) {
    this.createForm();
    this.featuredAdditionalVideosArray= this.blogForm.controls.featuredAdditionalVideos as FormArray;

  }

  ngOnInit(): void {
  }

  createForm() {
    var user = JSON.parse(localStorage.getItem('User'));
    this.blogForm = this.fb.group({
      templateType: [''],
      userId: [user.id],
      featuredTitle: [''],
      featuredDescription: [''],
      featuredPhoto: this.fb.array([]),
      featuredAdditionalPhotos: this.fb.array([]),
      featuredVideo:[''],
      featuredAdditionalVideos: this.fb.array([]),
    });
  }

  addScreenshotURL(){
      if(this.featuredAdditionalVideosArray.length < 4){
        this.featuredAdditionalVideosArray.push(new FormControl(''));
      }
  }
  removeScreenshotURL(index){
    this.featuredAdditionalVideosArray.removeAt(index);
  }
  createblog() {
    // console.log(this.blogForm.value,this.imagefeaturedAdditionalPhotos,this.imagefeaturedPhoto);
    this.orolService.createblog(this.blogForm.value,this.imagefeaturedAdditionalPhotos,this.imagefeaturedPhoto,)
// console.log(this.featuredAdditionalVideosArray.value);
// console.log(this.blogForm.get('featuredAdditionalVideos').value);
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
  onFeaturedPhoto(event) {
    if (event.target.files && event.target.files[0]) {
      var length = event.target.files.length;
      for (let i = 0; i < event.target.files.length; i++) {
        this.imagefeaturedPhoto.push(event.target.files[i]);
        var reader = new FileReader();
        reader.onload = (event: any) => {
         this.featuredPhoto = event.target.result;
        //  this.imageURL.push(event.target.result);
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }

  }


}
