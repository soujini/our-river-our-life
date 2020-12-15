import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Route, Router, NavigationStart, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { IMyOptions } from 'ng-uikit-pro-standard';
import { ModalDirective } from 'ng-uikit-pro-standard';
import { MapsAPILoader } from '@agm/core';
import { NgZone } from '@angular/core';
import { OrolService } from '../../services/orol.service';
import { MatStepper } from '@angular/material/stepper';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-river-monitoring',
  templateUrl: './river-monitoring.component.html',
  styleUrls: ['./river-monitoring.component.scss']
})
export class RiverMonitoringComponent implements OnInit {
  @ViewChild('river_monitoring_stepper', { static: false }) river_monitoring_stepper: MatStepper;
  @ViewChild('search', { static: true }) public searchElementRef: ElementRef;
  defaultImageURL: string = "../../../assets/icons/default_image_upload.jpg";
  @ViewChild('basicModal') basicModal: ModalDirective;
  defaultImageURLTemp: string = "../../../assets/icons/default_image_upload.jpg";
  public imageFile: File = null;
  public imageFileTemp: File = null;
  imageFileErrorMessage: String = "";
  note = ".jpg, .jpeg, .png, files accepted";
  info = "(Max. size 250KB)";
  geocoder: any;
  surroundingArray: any;
  reports:any=[];
  lastClickedIndex;
  public myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd mmm yyyy',
    closeAfterSelect: true
  };
  images = [];
  centerLoc: any = {};

  public imageFilesRiver: File[] = [];
  imageUrlRiver = [];
  public imageFilesSurrounding: File[] = [];
  imageUrlSurrounding = [];
  public imageFilesFlora: File[] = [];
  imageUrlFlora = [];
  public imageFilesFauna: File[] = [];
  imageUrlFauna = [];
  public imageFilesGroup: File[] = [];
  imageUrlGroup = [];
  public imageFilesActivity: File[] = [];
  imageUrlActivity = [];
  public imageFilesAtwork: File[] = [];
  imageUrlAtwork = [];
  submitStep1: boolean = false;
  submitStep2: boolean = false;
  submitStep3: boolean = false;

  userControl = new FormControl();
  items = [
    { name: "Present" },
    { name: "Absent" },
  ];
  waterLevels = [
    {
      name: "Low",
      imageUrl: "../../../assets/scalable-vector-graphics/water_level_low_icon.svg",
      imageUrlEnable: "../../../assets/scalable-vector-graphics/water_level_low_icon_enable.svg",

    },
    {
      name: "Normal",
      imageUrl: "../../../assets/scalable-vector-graphics/water_level_normal_icon.svg",
      imageUrlEnable: "../../../assets/scalable-vector-graphics/water_level_normal_icon_enable.svg",

    },

    {
      name: "High",
      imageUrl: "../../../assets/scalable-vector-graphics/water_level_high_icon.svg",
      imageUrlEnable: "../../../assets/scalable-vector-graphics/water_level_high_icon_enable.svg",

    },
    {
      name: "Flooded",
      imageUrl: "../../../assets/scalable-vector-graphics/water_level_flooded_icon.svg",
      imageUrlEnable: "../../../assets/scalable-vector-graphics/water_level_flooded_enable.svg",

    },
  ];
  weatherCodition = [
    {
      name: "Sunny",
      imageUrl: "../../../assets/scalable-vector-graphics/sunny_icon.svg",
      imageUrlEnable: "../../../assets/scalable-vector-graphics/sunny_icon_enable.svg",
    },
    {
      name: "Partly Cloudy",
      imageUrl: "../../../assets/scalable-vector-graphics/partly_cloudy_icon.svg",
      imageUrlEnable: "../../../assets/scalable-vector-graphics/partly_cloudy_icon_enable.svg",

    },

    {
      name: "Cloudy",
      imageUrl: "../../../assets/scalable-vector-graphics/cloudy_icon.svg",
      imageUrlEnable: "../../../assets/scalable-vector-graphics/cloudy_icon_enable.svg",

    },
    {
      name: "Light Rain",
      imageUrl: "../../../assets/scalable-vector-graphics/light_rain_icon.svg",
      imageUrlEnable: "../../../assets/scalable-vector-graphics/light_rain_icon_enable.svg",

    },
    {
      name: "Heavy Rain",
      imageUrl: "../../../assets/scalable-vector-graphics/heavy_rain_icon.svg",
      imageUrlEnable: "../../../assets/scalable-vector-graphics/heavy_rain_icon_enable.svg",

    },
  ];
  surroundings = [
    'Clothes washing',
    'Cattle grazing',
    'Vehicles',
    'Agricultural land',
    'Plantation',
    'Bridge',
    'Industry',
    'Place of worship',
    'Village',
    'Town',
    'Effluent discharge',
    'Sewage discharge',
    'Irrigation pump',
  ];

  lastFilter: string = '';
  activityForm: FormGroup;
  latitude: number;
  longitude: number;
  zoom: number;
  getAddress: any;
  lat: number;
  lng: number;

  constructor(private fb: FormBuilder, private orolService: OrolService,private router: Router,
    private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private spinnerService: SpinnerService) {
    this.createForm();
    this.surroundingArray = this.activityForm.controls.surroundings as FormArray;

  }
  mapReady(event) {
    this.setCurrentPosition();
  }

  ngOnInit() {
    this.zoom = 13;
    this.getWaterTestDetails();
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
          this.activityForm.get('generalInformation').patchValue({
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng(),
            location: place.formatted_address,
          });
          this.centerLoc = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
        });
      });
    });
  }


  getCurrentDate() {
    var dt = new Date();
    return dt.getDate();
  }

  getCurrentTime() {
    var d = new Date();
    d.setHours(d.getHours() + 2); // offset from local time
    var h = (d.getHours() % 12) || 12; // show midnight & noon as 12
    return (
      (h < 10 ? '0' : '') + h +
      (d.getMinutes() < 10 ? ':0' : ':') + d.getMinutes() +
      // optional seconds display
      // ( d.getSeconds() < 10 ? ':0' : ':') + d.getSeconds() +
      (d.getHours() < 12 ? ' AM' : ' PM')
    );

  }
  bla() {
    this.getAddressByLatitudeAndLongitude(this.activityForm.get('generalInformation').get('latitude').value,
      this.activityForm.get('generalInformation').get('longitude').value, this.activityForm.get('generalInformation'));
    this.centerLoc = {
      lat: this.activityForm.get('generalInformation').get('latitude').value, lng:
        this.activityForm.get('generalInformation').get('longitude').value
    };
  }


  createForm() {
    this.activityForm = this.fb.group({
      userId: [''],
      generalInformation: this.fb.group({
        activityDate: [this.getCurrentDate(), [Validators.required]],
        activityTime: [this.getCurrentTime(), [Validators.required]],
        testerName: ['', [Validators.required]],
        latitude: [''],
        longitude: [''],
        location: [''],
      }),
      waterLevelAndWeather: this.fb.group({
        airTemperature: ['', [Validators.required]],
        waterLevel: ['', [Validators.required]],
        weather: ['', [Validators.required]],
      }),
      surroundings: this.fb.array([]),
      waterTesting: this.fb.group({
        waterTemperature: [''],
        pH: [''],
        dissolvedOxygen: [''],
        hardness: [''],
        nitrate: [''],
        nitrite: [''],
        chlorine: [''],
        alkalinity: [''],
        iron: [''],
        bacteria: [''],
        turbidity: [''],
        phosphate: [''],
        ammonia: [''],
        lead: [''],
        dissolvedSolids: [''],
        conductivity: [''],
      }),
      // flora: this.fb.group({
      //   imageURL: [''],
      //   description: [''],
      // }),
      // fauna: this.fb.array([]),
      // artwork: this.fb.array([]),
      // groupPicture: this.fb.array([]),
      // activity: this.fb.array([]),
      // river: this.fb.group({
      //   imageURL: [''],
      //   description: [''],
      // }),
      // certificateURL: ['']
    });
  }



  onSubmit() {

  }
  validateStep1() {
    this.submitStep1 = true;
    if (this.activityForm.get('generalInformation').get('activityDate').valid &&
      this.activityForm.get('generalInformation').get('activityTime').valid &&
      this.activityForm.get('generalInformation').get('testerName').valid &&
      this.activityForm.get('generalInformation').get('location').valid &&
      this.activityForm.get('generalInformation').get('latitude').valid &&
      this.activityForm.get('generalInformation').get('longitude').valid

    ) {
      this.river_monitoring_stepper.next();
    }
  }
  validateStep2() {
    this.submitStep2 = true;
    if (this.activityForm.get('waterLevelAndWeather').get('airTemperature').valid &&
      this.activityForm.get('waterLevelAndWeather').get('waterLevel').valid &&
      this.activityForm.get('waterLevelAndWeather').get('weather').valid &&
      this.imageFilesRiver.length > 0

    ) {
      this.river_monitoring_stepper.next();
    }
  }
  validateStep4() {
    this.submitStep3 = true;
    if (this.activityForm.get('surroundings')['length'] > 0
    ) {
      this.river_monitoring_stepper.next();
    }
  }


  setSteep() {

  }
  getWaterTestDetails() {
      var user = JSON.parse(localStorage.getItem('User'));
    this.spinnerService.setSpinner(true);
    this.orolService.getWaterTestDetails().subscribe((data)=>{
      if(data['count']){
        this.reports=data['rows'].filter(r => r.userId == user.id);
      }
      this.spinnerService.setSpinner(false);
    });
  }

  createWaterTestDetails() {
    this.orolService.createWaterTestDetails(this.activityForm.value, this.imageFilesRiver,
      this.imageFilesSurrounding, this.imageFilesFlora, this.imageFilesFauna, this.imageFilesGroup, this.imageFilesActivity, this.imageFilesAtwork).
      subscribe((data) => {
        console.log(data);
          //Call Generate REPORT
        this.orolService.generateReport(data).subscribe(
          (res) => {
            this.spinnerService.setSpinner(false);
            console.log(res);
             this.router.navigate(['./home']);
          },
          (err) => {
            this.spinnerService.setSpinner(false);
            console.log(err);
          },
        );
      });
  }

  onFileChangesRiver(event) {
    if (event.target.files && event.target.files[0]) {
      var length = event.target.files.length;
      for (let i = 0; i < event.target.files.length; i++) {
        this.imageFilesRiver.push(event.target.files[i]);
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.imageUrlRiver.push(event.target.result);
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
  onFileChangesSurrounding(event) {
    if (event.target.files && event.target.files[0]) {
      var length = event.target.files.length;
      for (let i = 0; i < event.target.files.length; i++) {
        this.imageFilesSurrounding.push(event.target.files[i]);
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.imageUrlSurrounding.push(event.target.result);
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
  onFileChangesFlora(event) {
    if (event.target.files && event.target.files[0]) {
      var length = event.target.files.length;
      for (let i = 0; i < event.target.files.length; i++) {
        this.imageFilesFlora.push(event.target.files[i]);
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.imageUrlFlora.push(event.target.result);
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
  onFileChangesFauna(event) {
    if (event.target.files && event.target.files[0]) {
      var length = event.target.files.length;
      for (let i = 0; i < event.target.files.length; i++) {
        this.imageFilesFauna.push(event.target.files[i]);
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.imageUrlFauna.push(event.target.result);
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
  onFileChangesGroup(event) {
    if (event.target.files && event.target.files[0]) {
      var length = event.target.files.length;
      for (let i = 0; i < event.target.files.length; i++) {
        this.imageFilesGroup.push(event.target.files[i]);
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.imageUrlGroup.push(event.target.result);
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
  onFileChangesActivity(event) {
    if (event.target.files && event.target.files[0]) {
      var length = event.target.files.length;
      for (let i = 0; i < event.target.files.length; i++) {
        this.imageFilesActivity.push(event.target.files[i]);
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.imageUrlActivity.push(event.target.result);
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
  onFileChangesAtwork(event) {
    if (event.target.files && event.target.files[0]) {
      var length = event.target.files.length;
      for (let i = 0; i < event.target.files.length; i++) {
        this.imageFilesAtwork.push(event.target.files[i]);
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.imageUrlAtwork.push(event.target.result);
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  validate() {

  }
  removeImageFile() {
    this.imageFileErrorMessage = "";
    this.imageFile = null;
    this.imageFileTemp = null;
    this.defaultImageURL = "../../../assets/images/default_image_upload.png";
    this.defaultImageURLTemp = "../../../assets/images/default_image_upload.png";
    this.validate();
  }
  setImageURL() {
    if (this.imageFileTemp != null) {
      if (this.imageFileErrorMessage == '') {
        this.imageFile = this.imageFileTemp;
        this.defaultImageURL = this.defaultImageURLTemp;
        this.basicModal.hide();
        this.validate();
      }
    }
    else {
      this.imageFileErrorMessage = "";
      this.imageFileErrorMessage = "Please select an image";
    }
  }
  dataURItoBlob(dataURI, extension) {
    const byteString = atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/' + extension });
    return blob;
  }

  convertBase64toImage() {
    var x = this['imageURL'].split(";")[0];
    var extension = x.split('/')[1];
    var base64ImageURL = this['imageURL'].split("base64,")[1];
    const imageName = this['name'] + '.' + extension;
    const imageBlob = this.dataURItoBlob(base64ImageURL, extension);
    this.imageFile = new File([imageBlob], imageName, { type: 'image/' + extension });
    this.validate();
  }
  async getBufferImage(imageURL) {
    if (imageURL != undefined) {
      var re = /http/gi;
      var base64data;
      // var imageURL = (imageURL.toString()).replace(re, "https");
      // this.productDetails.imageURL="";
      this.getBufferImage(imageURL).then(

      );
    }
  }

  private setCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        var accuracy = position.coords.accuracy;
        this.activityForm.get('generalInformation').patchValue({
          latitude: +position.coords.latitude,
          longitude: +position.coords.longitude,
        });
        this.centerLoc = { lat: position.coords.latitude, lng: position.coords.longitude };
        this.getAddressByLatitudeAndLongitude(position.coords.latitude, position.coords.longitude, this.activityForm);
      });
    }
    else {
      // alert("Geolocation is not supported by this browser.");
    }
  }

  async getAddressByLatitudeAndLongitude(lat, lng, form) {
    var address;
    this.geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(lat, lng);
    await this.geocoder.geocode({ latLng: latlng }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var arrAddress = results;
        address = results[0].formatted_address;
        form.get('generalInformation').patchValue({
          location: address
        });
      } else {
        console.log("Geocoder failed due to: " + status);
        // alert("Geocoder failed due to: " + status + ". Please enter a valid latitide and longitude.")
      }
    });
  }

  setWeather(name) {
    this.activityForm.patchValue({
      waterLevelAndWeather: {
        weather: name
      }
    });
    console.log(this.activityForm.value);
  }

  setWaterLevel(name) {
    this.activityForm.patchValue({
      waterLevelAndWeather: {
        waterLevel: name
      }
    });
    console.log(this.activityForm.value);
  }
  setBacteria(name) {
    this.activityForm.patchValue({
      waterTesting: {
        bacteria: name
      }
    });
    console.log(this.activityForm.value)
  }
  changeActive(i) {
    this.lastClickedIndex = i;
  }

  checkSelectedSurroundings(capability) {
    let value = "-1";
    let index = this.surroundingArray.value.findIndex(record => record === capability);
    if (index != -1) {
      value = this.surroundingArray.value[index];
    }
    return value;
  }

  getSelectedSurroundings(event, obj) {
    // console.log(event);
    // console.log(obj);
    if (event.element.checked == true) {
      this.surroundingArray.push(this.fb.control(obj));
    }
    else {
      let index = this.surroundingArray.value.findIndex(record => record === (obj));
      if (index != -1) {
        this.surroundingArray.removeAt(index);
      }
    }
  }
}
