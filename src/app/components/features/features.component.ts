import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {
  feature1_show:boolean=false;
  feature2_show:boolean=false;
  feature3_show:boolean=false;
  feature4_show:boolean=false;

  constructor() { }

  ngOnInit(): void {
  }

}
