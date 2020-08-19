import { Component, AfterViewInit } from '@angular/core';
import { SpinnerService } from './services/spinner.service';
import { ActivatedRoute, Router, NavigationEnd ,NavigationStart, Event } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'our-river-our-life';
  isLoading:boolean=false;
timeout;

  constructor(private router: Router, public spinnerService:SpinnerService){
  router.events.subscribe((event: Event) => {

    if (event instanceof NavigationStart) {
      // Show loading indicator
      this.isLoading = true;
    }

    if (event instanceof NavigationEnd) {
      // Hide loading indicator
      this.timeout = setTimeout(() => {
        clearTimeout(this.timeout);
        this.isLoading = false;
      }, 1000);
    }
  });

  this.spinnerService.spinnerSubject.subscribe(data => {
      this.isLoading=data;
  });
}

  ngAfterViewInit(){

  }
}
