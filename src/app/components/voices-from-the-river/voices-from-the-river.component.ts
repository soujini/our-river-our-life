import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ModalDirective } from 'ng-uikit-pro-standard';
import { Router } from '@angular/router';


@Component({
  selector: 'app-voices-from-the-river',
  templateUrl: './voices-from-the-river.component.html',
  styleUrls: ['./voices-from-the-river.component.scss']
})
export class VoicesFromTheRiverComponent implements OnInit {
  blogs =[
    {
    featuredTitle :'Title of the news',
    featureDescription:'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impeditquo minus id quod maxime placeat facere possimus voluptas',
    featuredPhoto:'https://mdbootstrap.com/img/Photos/Others/images/81.jpg',
    createdAt:'15/07/2018',
    blogerName:'Billy Forester'
},
{
  featuredTitle :'Title of the news',
  featureDescription:'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis voluptatum deleniti atque corrupti quos dolores.',
  featuredPhoto:'https://mdbootstrap.com/img/Photos/Others/images/43.jpg',
  createdAt:'13/07/2018',
  blogerName:'Billy Forester'
},
{
  featuredTitle :'Title of the news',
  featureDescription:'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione.',
  featuredPhoto:'https://mdbootstrap.com/img/Photos/Others/images/13.jpg',
  createdAt:'11/07/2018',
  blogerName:'Billy Forester'
},
{
  featuredTitle :'Title of the news',
  featureDescription:'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione.',
  featuredPhoto:'https://mdbootstrap.com/img/Photos/Others/images/13.jpg',
  createdAt:'11/07/2018',
  blogerName:'Billy Forester'
},
{
  featuredTitle :'Title of the news',
  featureDescription:'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione.',
  featuredPhoto:'https://mdbootstrap.com/img/Photos/Others/images/13.jpg',
  createdAt:'11/07/2018',
  blogerName:'Billy Forester'
},
  ] ;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  gotoList() {
    this.router.navigate(['/add']);
  }

}
