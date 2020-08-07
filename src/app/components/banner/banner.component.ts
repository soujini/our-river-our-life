import { Component, OnInit, AfterViewInit } from '@angular/core';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, state, style, transition, animate, group } from '@angular/animations';
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    // alert("banner");
  }

}
