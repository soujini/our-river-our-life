import { Component,OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { IMyOptions } from 'ng-uikit-pro-standard';
declare var google;


@Component({
  selector: 'app-maps',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {
  @ViewChild('search', {static: true}) public searchElementRef: ElementRef;

  activeColor: string = 'green';

baseColor: string = '#ccc';
overlayColor: string = 'rgba(255,255,255,0.5)';

dragging: boolean = false;
loaded: boolean = false;
imageLoaded: boolean = false;
imageSrc: string = '';

  public myDatePickerOptions: IMyOptions = {
    // Your options
    };

  addingAlert:boolean;
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  show:boolean = false;
  buttonName = 'Show';
  hide: any;

  toggle() {
  this.show = !this.show

  if(this.show) {
  this.buttonName = 'Hide'
  console.log(this.show)
  }
  else {
  this.buttonName = 'Show'
  }
  }


  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  mapReady(event) {
    // console.log(event);
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
        //console.log(this.latitude, this.longitude);
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
   addAlert(){

    // this.addAlert=true;
   }

   handleDragEnter() {
    this.dragging = true;
}

handleDragLeave() {
    this.dragging = false;
}

handleDrop(e) {
    e.preventDefault();
    this.dragging = false;
    this.handleInputChange(e);
}

handleImageLoad() {
    this.imageLoaded = true;
}

handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    var pattern = /image-*/;
    var reader = new FileReader();

    if (!file.type.match(pattern)) {
        alert('invalid format');
        return;
    }

    this.loaded = false;

    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
}

_handleReaderLoaded(e) {
    var reader = e.target;
    this.imageSrc = reader.result;
    this.loaded = true;
}
}
