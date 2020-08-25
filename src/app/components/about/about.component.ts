import { Component, OnInit, AfterViewInit } from '@angular/core';
import 'jarallax';
declare var jarallax: any;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements AfterViewInit {

  constructor() { }

  // ngOnInit(): void {
  // }
  //
  ngAfterViewInit() {
    jarallax(document.querySelectorAll('.jarallax'), {
      speed: 0.2
    });
  }

}
