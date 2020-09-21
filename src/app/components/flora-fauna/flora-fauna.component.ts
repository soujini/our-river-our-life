import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
declare var google;
import {OrolService} from '../../services/orol.service';
import {SpinnerService} from '../../services/spinner.service';
import { HttpClient } from '@angular/common/http';
import { Event, Route, Router, ActivatedRoute,RoutesRecognized } from '@angular/router';


@Component({
  selector: 'app-flora-fauna',
  templateUrl: './flora-fauna.component.html',
  styleUrls: ['./flora-fauna.component.scss']
})
export class FloraFaunaComponent implements OnInit {
  @ViewChild('search', { static: true }) public searchElementRef: ElementRef;
  public submitted:boolean=false;
  public searchControl: FormControl;
  public imageFile: File=null;
  public typeOptions = [
  { value: '1', label: 'Flora' },
  { value: '2', label: 'Fauna' },
];

  resource: any;
  fauna :any =[];
  flora :any =[];
  imageURL:any;
  images = [

    // {
    //   img: 'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(145).jpg', thumb:
    //   'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(145).jpg', description: 'Image 1'
    // },
    // {
    //   img: 'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(150).jpg', thumb:
    //   'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(150).jpg', description: 'Image 2'
    // },
    // {
    //   img: 'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(152).jpg', thumb:
    //   'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(152).jpg', description: 'Image 3'
    // },
    // {
    //   img: 'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(42).jpg', thumb:
    //   'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(42).jpg', description: 'Image 4'
    // },
    // {
    //   img: 'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(151).jpg', thumb:
    //   'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(151).jpg', description: 'Image 5'
    // },
    // {
    //   img: 'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(40).jpg', thumb:
    //   'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(40).jpg', description: 'Image 6'
    // },
    // {
    //   img: 'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(148).jpg', thumb:
    //   'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(148).jpg', description: 'Image 7'
    // },
    // {
    //   img: 'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(147).jpg', thumb:
    //   'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(147).jpg', description: 'Image 8'
    // },
    // {
    //   img: 'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(149).jpg', thumb:
    //   'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(149).jpg', description: 'Image 9'
    // }
  ];
  geocoder: any;
  centerLoc:any={};
  floraFaunaForm: FormGroup;
  constructor(private fb: FormBuilder,private orolService: OrolService, private spinnerService:SpinnerService,
    public router: Router, private http: HttpClient,
      private mapsAPILoader: MapsAPILoader,
      private ngZone: NgZone) {
    this.createForm();
  }

  ngOnInit() {
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
          this.floraFaunaForm.patchValue({
            latitude:  place.geometry.location.lat(),
            longitude:  place.geometry.location.lng(),
            location: place.formatted_address,
          });
          this.centerLoc = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
        });
      });
    });
    // this.getSearchResource();
    this.getWaterTestDetails();
  }
  // changeProject(e) {
  //   if (e.target.value == 1) {
  //     console.log("Project One");
  //   }
  //   else if (e.target.value == 2) {
  //     console.log("Project Two");
  //   }
  //   else if (e.target.value == 3) {
  //     console.log("Project Three");
  //   }
  //   this.setProducts();
  // }
  // private setProducts() {
  //   if ((this.selectedProject === "Project two" && this.selectedProperty === 'PC103') || (this.selectedProject === "Project three" && this.selectedProperty === 'PC102')) {
  //
  //     let potentialProduct = [
  //       {
  //         key: 123, value: `${this.selectedProperty}PROD123`,
  //       },
  //       {
  //         key: 456, value: `${this.selectedProperty}PROD456`,
  //       },
  //       {
  //         key: 789, value: `${this.selectedProperty}PROD789`,
  //       }
  //     ]
  //
  //     this.product = potentialProduct;
  //   } else {
  //     this.product = [];
  //   }
  // }

  bla(){
    this.getAddressByLatitudeAndLongitude(this.floraFaunaForm.get('latitude').value, this.floraFaunaForm.get('longitude').value, this.floraFaunaForm);
    this.centerLoc = { lat: this.floraFaunaForm.get('latitude').value, lng: this.floraFaunaForm.get('longitude').value };
    //this.recenterMap();
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
        this.floraFaunaForm.patchValue({
          latitude: +position.coords.latitude,
          longitude: +position.coords.longitude,
        });
        this.centerLoc = { lat: position.coords.latitude, lng: position.coords.longitude };
        // this.latitude=position.coords.latitude;
        // this.longitude=position.coords.longitude;
        this.getAddressByLatitudeAndLongitude(position.coords.latitude, position.coords.longitude, this.floraFaunaForm);
        // this.zoom = 15;
      });
    }
    else {
      // alert("Geolocation is not supported by this browser.");
    }
  }

  onSelectFile(event) {
  this.imageFile = event.target.files;
  var reader = new FileReader();
      reader.onload = (event:any) => {
         this.imageURL = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    // if (event.target.files && event.target.files[0]) {
    //   var filesAmount = event.target.files.length;
    //   for (let i = 0; i < filesAmount; i++) {
    //     var reader = new FileReader();
    //
    //     reader.onload = (event:any) => {
    //       // console.log(event.target.result);
    //        this.images.push(event.target.result);
    //     }
    //
    //     reader.readAsDataURL(event.target.files[i]);
    //   }
    // }
  }
  //
  // getSearchResource() {
  //   this.resource = this.resources_mock;
  //
  // }
  getWaterTestDetails() {
    this.orolService.getWaterTestDetails().subscribe((data)=>{
      if(data['count']){
        for(var i=0; i<data['rows'].length;i++){
          if(data['rows'][i].fauna.length > 0){
            for(var j=0; j<data['rows'][i].fauna.length;j++){
              this.fauna.push({
                img: data['rows'][i].fauna[j].imageURL,
                thumb:data['rows'][i].fauna[j].imageURL,
              });
            }
            for(var j=0; j<data['rows'][i].flora.length;j++){
              this.flora.push({
                img: data['rows'][i].flora[j].imageURL,
                thumb:data['rows'][i].flora[j].imageURL,
              });
            }
          }
        }
      }
      this.spinnerService.setSpinner(false);
    });
  }
  createForm() {
    this.floraFaunaForm = this.fb.group({
      type:['',[Validators.required]],
      location: ['',[Validators.required]],
      commonName: ['',[Validators.required]],
      localName: ['',[Validators.required]],
      scientificName: ['',[Validators.required]],
      latitude: [23.074290,[Validators.required]],
      longitude: [79.134113,[Validators.required]],
      photos: ['']
    });
  }
  async addFloraFauna() {
    this.submitted = true;
      // await this.orolService.addFloraFauna(this.floraFaunaForm.value, this.imageFile);
      // this.setCurrentPosition();
      // this.imageURL="";
      // this.imageFile=null;
  }
}
