import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { IMyOptions } from 'ng-uikit-pro-standard';
import { timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
declare var google;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {
  images = [];
  // myForm = new FormGroup({
  //   name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  //   file: new FormControl('', [Validators.required]),
  //   fileSource: new FormControl('', [Validators.required])
  // });

  @ViewChild('search', { static: true }) public searchElementRef: ElementRef;
  // date = new FormControl(new Date());
  // public time = new Date();
  activeColor: string = 'green';
  mapsForm: FormGroup;
  // imagesArray:any;
  geocoder:any;
  baseColor: string = '#ccc';
  overlayColor: string = 'rgba(255,255,255,0.5)';
  dragging: boolean = false;
  loaded: boolean = false;
  imageLoaded: boolean = false;
  imageSrc: string = '';

  public myDatePickerOptions: IMyOptions = {
    // Your options
  };

  addingAlert: boolean;
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


  constructor(private fb: FormBuilder,private http: HttpClient,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {
    this.createForm();
    // this.imagesArray = this.mapsForm.controls.images as FormArray;

  }

  mapReady(event) {
    // console.log(event);
    this.setCurrentPosition();
  }


  ngOnInit() {
    //set google maps defaults
    this.zoom = 15;
    this.searchControl = new FormControl();

    //load Places Autocomplete
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
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          // this.zoom = 12;
        });
      });
    });
  }

  // recenterMap() {
  //   this.latitude = 36.8392542;
  //   this.longitude = 10.313922699999999;
  // }

  createForm() {
    this.mapsForm = this.fb.group({
      location:[''],
      latitude:[''],
      longitude:[''],
      activityDate:[(new Date())],
      activityTime:[''],
      photos: this.fb.array([]),
      experience:['']
    });
  }

  async getAddressByLatitudeAndLongitude(lat, lng, form) {
    var address;
    this.geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(lat, lng);

    await this.geocoder.geocode({latLng: latlng}, function(results, status) {
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
          longitude: position.coords.latitude,
        });
        this.getAddressByLatitudeAndLongitude(position.coords.latitude + (0.0000000000100 * Math.random()), position.coords.latitude + (0.0000000000100 * Math.random()), this.mapsForm);
        // this.zoom = 15;
      });
    }
    else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  // getPosition() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.latitude = position.coords.latitude + (0.0000000000100 * Math.random());
  //       this.longitude = position.coords.longitude + (0.0000000000100 * Math.random());
  //     });
  //   } else {
  //     alert("Geolocation is not supported by this browser.");
  //   }
  // }
  addAlert() {

    console.log(this.mapsForm.value);
    // this.addAlert=true;
  }

  // handleDrop(e) {
  //   e.preventDefault();
  //   this.dragging = false;
  //   this.handleInputChange(e);
  // }
  //
  // handleImageLoad() {
  //   this.imageLoaded = true;
  // }

  // handleInputChange(e) {
  //   var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

  //   var pattern = /image-*/;
  //   var reader = new FileReader();

  //   if (!file.type.match(pattern)) {
  //     alert('invalid format');
  //     return;
  //   }

  //   this.loaded = false;

  //   reader.onload = this._handleReaderLoaded.bind(this);
  //   reader.readAsDataURL(file);
  // }

  // _handleReaderLoaded(e) {
  //   var reader = e.target;
  //   this.imageSrc = reader.result;
  //   this.loaded = true;
  // }
  // get f(){
  //
  //   return this.myForm.controls;
  //
  // }
  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event:any) => {
          console.log(event.target.result);
          this.images.push(event.target.result);
          // this.mapsForm.patchValue({
          //   photos:this.images
          //   // fileSource: this.images
          // });
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
}
