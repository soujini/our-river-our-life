import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { IMyOptions } from 'ng-uikit-pro-standard';
import { timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OrolService } from '../../services/orol.service';
import { Event, Route, Router, ActivatedRoute,RoutesRecognized } from '@angular/router';


declare var google;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

  public iconUrl = '../../../assets/scalable-vector-graphics/flood-watch.svg';
  public imageFiles: File[]=[];
  @ViewChild('search', { static: true }) public searchElementRef: ElementRef;
  public myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd mmm yyyy',
    closeAfterSelect:true
  };
  apps: any;
  images = [];
  geocoder: any;
  mapsForm: FormGroup;
  // public latitude: number = 23.074290;
  // public longitude: number = 79.134113;
  public searchControl: FormControl;
  public zoom: number;
  show: boolean = false;
  buttonName = 'Show';
  hide: any;
  centerLoc:any={};
  selectedImage:any=[];

  toggle(mode:string) {
    this.show = !this.show;
    if(mode == ''){
      this.setCurrentPosition();
    }
  }

  constructor(public router: Router, private fb: FormBuilder, private http: HttpClient, private orolService: OrolService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {
    this.createForm();

  }

  mapReady(event) {
    // console.log(event);
    this.setCurrentPosition();
    // this.getGeoLocation();
  }
  //    getGeolocation() {
  //   navigator.geolocation.getCurrentPosition(drawMap);
  // }


  ngOnInit() {
    this.setCurrentTime();
    this.zoom = 13;
    this.searchControl = new FormControl();
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });

      autocomplete.addListener("place_changed", () => {
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
            location: place.formatted_address,
          });
          this.centerLoc = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
        });
      });
    });
  }

  setCurrentTime(){
    let dt = new Date();
    let normalizeHour = dt.getHours() >= 13 ? dt.getHours() - 12 : dt.getHours()
    var formattedTime = dt.getHours() >= 13 ? normalizeHour + ':' + dt.getMinutes() + 'PM' : normalizeHour + ':' + dt.getMinutes() + 'AM';
    this.mapsForm.patchValue({
      activityTime: formattedTime
    });
  }

  bla(){
    this.getAddressByLatitudeAndLongitude(this.mapsForm.get('latitude').value, this.mapsForm.get('longitude').value, this.mapsForm);
    this.centerLoc = { lat: this.mapsForm.get('latitude').value, lng: this.mapsForm.get('longitude').value };
    //this.recenterMap();
  }

  recenterMap() {
    // this.latitude = this.mapsForm.get('latitude').value;
    // this.longitude = this.mapsForm.get('longitude').value;
  }

  createForm() {
    this.mapsForm = this.fb.group({
      location: [''],
      latitude: [23.074290],
      longitude: [79.134113],
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
        var accuracy = position.coords.accuracy;
        // alert(accuracy);
        this.mapsForm.patchValue({
          latitude: +position.coords.latitude,
          longitude: +position.coords.longitude,
        });
        this.centerLoc = { lat: position.coords.latitude, lng: position.coords.longitude };
        // this.latitude=position.coords.latitude;
        // this.longitude=position.coords.longitude;
        this.getAddressByLatitudeAndLongitude(position.coords.latitude, position.coords.longitude, this.mapsForm);
        // this.zoom = 15;
      });
    }
    else {
      // alert("Geolocation is not supported by this browser.");
    }
  }

  async addAlert() {
      await this.orolService.addAlert(this.mapsForm.value, this.imageFiles);
      this.show = false;
      this.setCurrentPosition();
      this.images=[];
      this.imageFiles=[];
  }

  onFileChange(event) {
      if (event.target.files && event.target.files[0]) {
        var length = event.target.files.length;
        for (let i = 0; i < event.target.files.length; i++) {
          this.imageFiles.push(event.target.files[i]);
          var reader = new FileReader();
          reader.onload = (event:any) => {
          this.images.push(event.target.result);
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }

}
}
