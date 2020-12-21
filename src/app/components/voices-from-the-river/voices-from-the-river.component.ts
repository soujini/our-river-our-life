import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ModalDirective } from 'ng-uikit-pro-standard';
import { Router } from '@angular/router';
import { OrolService } from '../../services/orol.service';
import { SpinnerService } from '../../services/spinner.service';


@Component({
  selector: 'app-voices-from-the-river',
  templateUrl: './voices-from-the-river.component.html',
  styleUrls: ['./voices-from-the-river.component.scss']
})
export class VoicesFromTheRiverComponent implements OnInit {
  blogs =[] ;

  constructor(private router: Router, private orolService: OrolService,
    private spinnerService: SpinnerService) {
      this. getBlogs();
     }

  ngOnInit(): void {

  }
  gotoList() {
    this.router.navigate(['/add']);
  }

  getBlogs() {
    // var a = this.orolService.getBlogs();
    console.log(this.blogs);
    this.orolService.getBlogs().subscribe((data)=>{
      if(data['count']){
        for(var i=0; i<data['rows'].length;i++){
          this.blogs.push({
            featuredTitle:data['rows'][i].featuredTitle,
            featuredDescription:data['rows'][i].featuredDescription,
            featuredPhoto:data['rows'][i].featuredPhoto,
            createdAt:data['rows'][i].createdAt,
            contributorName:data['rows'][i].contributorName,
            // {
//   featuredTitle :'Title of the news',
//   featureDescription:'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione.',
//   featuredPhoto:'https://mdbootstrap.com/img/Photos/Others/images/13.jpg',
//   createdAt:'11/07/2018',
//   blogerName:'Billy Forester'
// },
          });
        }
      }
      // this.spinnerService.setSpinner(false);
    });
  }
}
