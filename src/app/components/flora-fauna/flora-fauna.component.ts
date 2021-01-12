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
  @ViewChild('search', { static: true }) public searchElementRef: ElementRef;
  public submitted: boolean = false;
  public searchControl: FormControl;
  public imageFile: File[] = [];
  public imageFile2: File;
  public typeOptions = [
    { value: '1', label: 'Flora' },
    { value: '2', label: 'Fauna' },
  ];
  public waterTestDetails: any;
  resource: any;
  fauna: any = [];
  flora: any = [];
  imageURL: any = "../../../assets/scalable-vector-graphics/flood-watch.svg";
  images = [
  ];
  geocoder: any;
  centerLoc: any = {};
  floraFaunaForm: FormGroup;
  sizeOfOriginalImage:number;
  sizeOFCompressedImage:number;
  imgResultAfterCompress:string;
  localCompressedURl:any;
  
  constructor(private fb: FormBuilder, private orolService: OrolService, private spinnerService: SpinnerService,
    public router: Router, private http: HttpClient,private imageCompress: NgxImageCompressService,
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
      // alert("Geolocation is not supported by this browser.");
    }
  }
   // onSelectFile(event) {
  //   if (event.target.files && event.target.files[0]) {
  //     var length = event.target.files.length;
  //     for (let i = 0; i < event.target.files.length; i++) {
  //       this.imageFile.push(event.target.files[i]);
  //       var reader = new FileReader();
  //       reader.onload = (event:any) => {
  //         this.imageURL = event.target.result;
  //         this.image.push(event.target.result);
  //       }
  //       reader.readAsDataURL(event.target.files[i]);
  //     }
  //   }

  // }

  onSelectFile(event) {
    var fileName: any;
    this.imageFile = event.target.files[0];
    console.log(this.imageFile);
    fileName = this.imageFile['name'];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageURL = event.target.result;
        this.compressFile(this.imageURL,fileName)
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
 
  compressFile(imageURL, fileName) {
    var orientation = -1;
    this.sizeOfOriginalImage = this.imageCompress.byteCount(imageURL) / (1024 * 1024);
    this.imageCompress.compressFile(imageURL, orientation, 50, 50).then(
      result => {
        this.imgResultAfterCompress = result;
        this.localCompressedURl = result;
        this.sizeOFCompressedImage = this.imageCompress.byteCount(result) / (1024 * 1024);
        console.log(this.sizeOFCompressedImage)

        const imageName = fileName;// call method that creates a blob from dataUri
        const imageBlob = this.dataURItoBlob(this.imgResultAfterCompress.split(',')[1]); //imageFile created below is the new compressed file which can be send to API in form data
        this.imageFile2 = new File([result], imageName, { type: 'image/jpeg' });
        alert(typeof(result));
      });
  }
  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(arrayBuffer); for (let i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([intArray], { type: 'image/jpeg' });
    return blob;
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
    console.log(typeof( this.imageFile2));
    this.submitted = true;
    console.log(this.floraFaunaForm.value);
    if (this.floraFaunaForm.get('type').value == 1) {
      this.orolService.addFlora(this.floraFaunaForm.value, this.imageFile2);
      this.spinnerService.setSpinner(true);

    }
    if (this.floraFaunaForm.get('type').value == 2) {
      this.orolService.addFauna(this.floraFaunaForm.value, this.imageFile2);
      this.spinnerService.setSpinner(true);

    }
  }

}
