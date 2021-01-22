import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
declare var google;
import { OrolService } from '../../services/orol.service';
import { SpinnerService } from '../../services/spinner.service';
import { HttpClient } from '@angular/common/http';
import { Event, Route, Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-flora-fauna',
  templateUrl: './flora-fauna.component.html',
  styleUrls: ['./flora-fauna.component.scss']
})
export class FloraFaunaComponent implements OnInit {
  pageNumber = 1;
  @ViewChild('search', { static: true }) public searchElementRef: ElementRef;
  public submitted: boolean = false;
  public searchControl: FormControl;
  public imageFile: File;
  public typeOptions = [
    { value: '1', label: 'Flora' },
    { value: '2', label: 'Fauna' },
  ];
  public waterTestDetails: any;
  resource: any;
  fauna: any = [];
  flora: any = [];
  images = [
  ];

  geocoder: any;
  centerLoc: any = {};
  floraFaunaForm: FormGroup;
  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;

  constructor(private fb: FormBuilder, private orolService: OrolService, private spinnerService: SpinnerService,
    public router: Router, private http: HttpClient, private imageCompress: NgxImageCompressService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {
    this.createForm();
    // this.pageNumber=1;

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
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng(),
            location: place.formatted_address,
          });
          this.centerLoc = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
        });
      });
    });
    // this.getSearchResource();
    this.getWaterTestDetails();
    this.getFloraFauna();
  }


  bla() {
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
        this.floraFaunaForm.patchValue({
          latitude: +position.coords.latitude,
          longitude: +position.coords.longitude,
        });
        this.centerLoc = { lat: position.coords.latitude, lng: position.coords.longitude };
        this.getAddressByLatitudeAndLongitude(position.coords.latitude, position.coords.longitude, this.floraFaunaForm);
      });
    }
    else {
    }
  }


  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
  compressFile() {    
    var orientation = -1;
    var filename=  ""; 
    this.imageCompress.uploadFile().then(({ image }) => {
      this.imgResultBeforeCompress = image;
      if (this.floraFaunaForm.get('type').value == 1){
         filename = "flora_"+ Date.now();
      }
      else if(this.floraFaunaForm.get('type').value == 2){
        filename = "fauna_"+ Date.now();
     }
      
       this.imageCompress.compressFile(image, orientation, 50, 50,).then(
        result => {
          this.imgResultAfterCompress = result;
          this.imageFile = this.dataURLtoFile(this.imgResultAfterCompress,filename );
        }
      );

    });
  }

  getFloraFauna() {
    this.spinnerService.setSpinner(true);
    this.orolService.getFloraFauna().subscribe((data) => {
      if (data['count']) {
        for (var i = 0; i < data['rows'].length; i++) {
          if (data['rows'][i].fauna.length > 0) {
            for (var j = 0; j < data['rows'][i].fauna.length; j++) {
              this.fauna.push({
                img: data['rows'][i].fauna[j].imageURL,
                thumb: data['rows'][i].fauna[j].imageURL,
                commonName: data['rows'][i].commonName,
                scientificName: data['rows'][i].scientificName,
                localName: data['rows'][i].localName,
                location: data['rows'][i].location,
                contributorName: data['rows'][i].contributorName,
              });
            }
          }
          if (data['rows'][i].flora.length > 0) {
            for (var j = 0; j < data['rows'][i].flora.length; j++) {
              this.flora.push({
                img: data['rows'][i].flora[j].imageURL,
                thumb: data['rows'][i].flora[j].imageURL,
                commonName: data['rows'][i].commonName,
                scientificName: data['rows'][i].scientificName,
                localName: data['rows'][i].localName,
                location: data['rows'][i].location,
                contributorName: data['rows'][i].contributorName,
              });
            }
          }
        }
      }
      this.spinnerService.setSpinner(false);
    });
  }

  getWaterTestDetails() {
    this.spinnerService.setSpinner(true);
    this.orolService.getWaterTestDetails().subscribe((data) => {
      if (data['count']) {
        for (var i = 0; i < data['rows'].length; i++) {
          if (data['rows'][i].fauna.length > 0) {
            for (var j = 0; j < data['rows'][i].fauna.length; j++) {
              this.fauna.push({
                img: data['rows'][i].fauna[j].imageURL,
                thumb: data['rows'][i].fauna[j].imageURL,
                location: data['rows'][i].location,
                contributorName: data['rows'][i].contributorName,
              });
            }
          }
          if (data['rows'][i].flora.length > 0) {
            for (var j = 0; j < data['rows'][i].flora.length; j++) {
              this.flora.push({
                img: data['rows'][i].flora[j].imageURL,
                thumb: data['rows'][i].flora[j].imageURL,
                location: data['rows'][i].location,
                contributorName: data['rows'][i].contributorName,
              });
            }
          }
        }
      }
      this.spinnerService.setSpinner(false);
    });
  }
  createForm() {
    var user = JSON.parse(localStorage.getItem('User'));
    this.floraFaunaForm = this.fb.group({
      type: ['', [Validators.required]],
      userId: [user.id],
      location: ['', [Validators.required]],
      commonName: ['', [Validators.required]],
      localName: ['', [Validators.required]],
      scientificName: ['', [Validators.required]],
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]],
    });
  }
  async addFloraFauna() {
    this.submitted = true;
    if (this.floraFaunaForm.get('type').value == 1) {
      this.orolService.addFlora(this.floraFaunaForm.value, this.imageFile);
      this.spinnerService.setSpinner(true);

    }
    if (this.floraFaunaForm.get('type').value == 2) {
      this.orolService.addFauna(this.floraFaunaForm.value, this.imageFile);
      this.spinnerService.setSpinner(true);

    }
  }
  onScroll() {
    this.pageNumber = this.pageNumber + 1;
  }

}
