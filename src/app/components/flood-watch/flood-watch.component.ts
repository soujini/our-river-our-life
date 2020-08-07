import { Component,OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { IMyOptions } from 'ng-uikit-pro-standard';
declare var google;

@Component({
  selector: 'app-flood-watch',
    templateUrl: './flood-watch.component.html',
    styleUrls: ['./flood-watch.component.scss']
})
export class FloodWatchComponent implements OnInit {
  ngOnInit(){
    
  }

}
