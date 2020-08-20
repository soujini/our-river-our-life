import { Component, OnInit, AfterViewInit } from '@angular/core';
import 'jarallax';
declare var jarallax: any;

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements AfterViewInit {
feature1_show:boolean=false;
feature2_show:boolean=false;
feature3_show:boolean=false;
feature4_show:boolean=false;

  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    jarallax(document.querySelectorAll('.jarallax'), {
      speed: 0.2
    });
  }

}
