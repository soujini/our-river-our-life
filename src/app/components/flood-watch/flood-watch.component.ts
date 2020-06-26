import { Component,OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
declare var google;

@Component({
  selector: 'app-flood-watch',
    templateUrl: './flood-watch.component.html',
    styleUrls: ['./flood-watch.component.scss']
})
export class FloodWatchComponent implements OnInit {
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild('search', {static: true}) public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  mapReady(event) {
    console.log(event);
    this.setCurrentPosition();
  }

  ngOnInit() {
    //set google maps defaults
    this.zoom = 15;
    /* this.latitude = 39.8282;
    this.longitude = -98.5795; */

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    
    // this.recenterMap()

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }
  recenterMap(){
    this.latitude = 36.8392542;
    this.longitude = 10.313922699999999;
  }

  private setCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
        console.log(this.latitude, this.longitude);
      });
    }
  }

  getPosition(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {        
    this.latitude=position.coords.latitude+(0.0000000000100*Math.random());
    this.longitude=position.coords.longitude+(0.0000000000100*Math.random());
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
   }
}


