import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { IMyOptions } from 'ng-uikit-pro-standard';
import { timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OrolService } from '../../services/orol.service';

declare var google;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {
  public imageFiles: File[]=[];
  @ViewChild('search', { static: true }) public searchElementRef: ElementRef;
  public myDatePickerOptions: IMyOptions = {};
  apps: any;
  images = [];
  geocoder: any;
  mapsForm: FormGroup;
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  show: boolean = false;
  buttonName = 'Show';
  hide: any;

  toggle() {
    this.show = !this.show

    if (this.show) {
      this.buttonName = 'Hide'
      console.log(this.show)
    }
    else {
      this.buttonName = 'Show'
    }
  }


  constructor(private fb: FormBuilder, private http: HttpClient, private orolService: OrolService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {
    this.createForm();
    
  }

  mapReady(event) {
    // console.log(event);
    this.setCurrentPosition();
  }


  ngOnInit() {
      this.zoom = 15;
    this.searchControl = new FormControl();
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        alert("wah");
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.mapsForm.patchValue({
            latitude:  place.geometry.location.lat(),
            longitude:  place.geometry.location.lng(),
          });

          // this.zoom = 12;
        });
      });
    });
  }

  recenterMap() {
    this.latitude = 36.8392542;
    this.longitude = 10.313922699999999;
  }

  createForm() {
    this.mapsForm = this.fb.group({
      location: [''],
      latitude: [''],
      longitude: [''],
      activityDate: [(new Date())],
      activityTime: [''],
      photos: this.fb.array([]),
      experience: ['']
    });
  }

  async getAddressByLatitudeAndLongitude(lat, lng, form) {
    var address;
    this.geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(lat, lng);

    await this.geocoder.geocode({ latLng: latlng }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var arrAddress = results;
        address = results[0].formatted_address;
        form.patchValue({
          location: address
        });
      } else {
        console.log("Geocoder failed due to: " + status);
      }
    });
  }

  private setCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.mapsForm.patchValue({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        this.latitude=position.coords.latitude;
        this.longitude=position.coords.longitude;
        this.getAddressByLatitudeAndLongitude(position.coords.latitude, position.coords.longitude, this.mapsForm);
        // this.zoom = 15;
      });
    }
    else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  addAlert() {
    console.log(this.imageFiles);
     this.orolService.addAlert(this.mapsForm.value, this.imageFiles);
    //     this.orolService.addAlert().then(
    //   data => {
    //     this.apps=data.response;
    //     console.log('success Add Alert');
    //   },
    //   error => {
    //     console.log('oops  Add Alert', error);
    //     return error;
    //   }
    // );

    console.log(this.mapsForm.value);
    // this.addAlert=true;
  }

  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      var length = event.target.files.length;
      for (let i = 0; i < event.target.files.length; i++) {
        console.log(event.target.files[i]);
         this.imageFiles.push(event.target.files[i]);
        // var reader = new FileReader();
        // reader.onload = (event:any) => {
        //   console.log(event.target.result);
          //this.images.push(event.target.result);
          // this.mapsForm.patchValue({
          //   photos:this.images
          //   // fileSource: this.images
          // });
        }
        //reader.readAsDataURL(event.target.files[i]);
      }
    }

}
