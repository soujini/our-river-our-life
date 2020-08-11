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

  myForm = new FormGroup({

   name: new FormControl('', [Validators.required, Validators.minLength(3)]),

   file: new FormControl('', [Validators.required]),

   fileSource: new FormControl('', [Validators.required])

 });
  @ViewChild('search', { static: true }) public searchElementRef: ElementRef;
  activityDate = new FormControl(new Date());
  // public activityTime = new Date();
  activeColor: string = 'green';
  mapsForm: FormGroup;
  imagesArray:any;
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
    this.imagesArray = this.mapsForm.controls.images as FormArray;

   }
 
  mapReady(event) {
    // console.log(event);
    this.setCurrentPosition();
  }
   codeLatLng(lat, lng) {
     var itemLocality;
     this.geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(lat, lng);
    this.geocoder.geocode({latLng: latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          var arrAddress = results;
          console.log(results);
          for ( var i=0;i<results;i++)
          {
           if (i==0){
            if (results[i].types[0] == "locality") {
              console.log("City: " + results[i].address_components[0].long_name);
              itemLocality = results[i].address_components[0].long_name;
            }
          }
          }
     
        } else {
          alert("No results found");
        }
      } else {
        alert("Geocoder failed due to: " + status);
      }
    });
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
  recenterMap() {
    this.latitude = 36.8392542;
    this.longitude = 10.313922699999999;
  }

  createForm() {
    this.mapsForm = this.fb.group({
      location:[''],
      latitude:[''],
      longitude:[''],
      activityDate:[''],
      activityTime:[''],
      images:this.fb.array([]),
      experience:['']
    });


  }
  private setCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
        this.mapsForm.patchValue ({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          location: 'kaveri',
          experience:'N/A',
        }) ;
        this.codeLatLng(12.385129, 75.491320);
        // this.codeLatLng( position.coords.latitude, position.coords.longitude);
        // this.longitude = position.coords.longitude;
        this.zoom = 15;
        //console.log(this.latitude, this.longitude);
      });
    }
  }

  getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude + (0.0000000000100 * Math.random());
        this.longitude = position.coords.longitude + (0.0000000000100 * Math.random());
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  addAlert() {

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
  get f(){

    return this.myForm.controls;

  }
  onFileChange(event) {

    if (event.target.files && event.target.files[0]) {

        var filesAmount = event.target.files.length;

        for (let i = 0; i < filesAmount; i++) {

                var reader = new FileReader();

   

                reader.onload = (event:any) => {

                  console.log(event.target.result);

                   this.images.push(event.target.result); 

   

                   this.myForm.patchValue({

                      fileSource: this.images

                   });

                }

  

                reader.readAsDataURL(event.target.files[i]);

        }

    }

  }
  submit(){

    console.log(this.myForm.value);

    this.http.post('http://localhost:8001/upload.php', this.myForm.value)

      .subscribe(res => {

        console.log(res);

        alert('Uploaded Successfully.');

      })

  }
}
