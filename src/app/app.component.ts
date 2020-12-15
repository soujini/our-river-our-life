import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './services/spinner.service';
import { ActivatedRoute, Router, NavigationEnd ,NavigationStart, Event } from '@angular/router';
import { OrolService } from './services/orol.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'our-river-our-life';
  isLoading:boolean=false;
  timeout;

  constructor(private router: Router, public spinnerService:SpinnerService, public orolService:OrolService){

  var user = JSON.parse(localStorage.getItem('User'));
  if(user != null){ //Logged In
    this.orolService.userDetailsSubject.next(user);
  }

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

  // this.orolService.userDetailsSubject.subscribe(data => {
  //   console.log("user details");
  //   console.log(data);
  //   // this.errorMessage=data;
  // });
}
ngOnInit(){
}
 
}
