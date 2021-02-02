import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Route, Router, NavigationStart, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { IMyOptions, MdbStepperComponent } from 'ng-uikit-pro-standard';
import { ModalDirective,ClockPickerComponent } from 'ng-uikit-pro-standard';
import { MapsAPILoader } from '@agm/core';
import { NgZone } from '@angular/core';
import { OrolService } from '../../services/orol.service';
import { NgxImageCompressService } from 'ngx-image-compress';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-river-monitoring',
  templateUrl: './river-monitoring.component.html',
  styleUrls: ['./river-monitoring.component.scss']
})
export class RiverMonitoringComponent implements OnInit {
  @ViewChild('river_monitoring_stepper', { static: true }) river_monitoring_stepper: MdbStepperComponent
  @ViewChild('search', { static: true }) public searchElementRef: ElementRef;
  defaultImageURL: string = "../../../assets/icons/default_image_upload.jpg";
  @ViewChild('basicModal') basicModal: ModalDirective;
  @ViewChild('timePicker', { static: true }) timePicker: ClockPickerComponent;
  defaultImageURLTemp: string = "../../../assets/icons/default_image_upload.jpg";
  public imageFile: File = null;
  public imageFileTemp: File = null;
  imageFileErrorMessage: String = "";
  note = ".jpg, .jpeg, .png, files accepted";
  info = "(Max. size 250KB)";
  geocoder: any;
  surroundingArray: any;
  reports: any = [];
  lastClickedIndex;
  public myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd mmm yyyy',
    closeAfterSelect: true
  };
  public myTimePickerOptions: IMyOptions = {
    // dateFormat: 'dd mmm yyyy',
    closeAfterSelect: true
  };
  images = [];
  centerLoc: any = {};
  decimalPattern = /^\d+(\.\d)?\d*$/;

  public imageFilesRiver: File[] = [];
  imageUrlRiver: any = [];
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
  public imageFilesArtwork: File[] = [];
  imageUrlArtwork = [];
  submitStep1: boolean = false;
  submitStep2: boolean = false;
  submitStep3: boolean = false;
  pageNumber = 1;

  userControl = new FormControl();
  items = [
    { name: "Present" },
    { name: "Absent" },
  ];
  waterLevels = [
    {
      name: "Low",
      imageUrl: "../../../assets/icons/water_level_low_icon.svg",
      imageUrlEnable: "../../../assets/icons/water_level_low_icon_enable.svg",

    },
    {
      name: "Normal",
      imageUrl: "../../../assets/icons/water_level_normal_icon.svg",
      imageUrlEnable: "../../../assets/icons/water_level_normal_icon_enable.svg",

    },

    {
      name: "High",
      imageUrl: "../../../assets/icons/water_level_high_icon.svg",
      imageUrlEnable: "../../../assets/icons/water_level_high_icon_enable.svg",

    },
    {
      name: "Flooded",
      imageUrl: "../../../assets/icons/water_level_flooded_icon.svg",
      imageUrlEnable: "../../../assets/icons/water_level_flooded_enable.svg",

    },
  ];
  weatherCodition = [
    {
      name: "Sunny",
      imageUrl: "../../../assets/icons/sunny_icon.svg",
      imageUrlEnable: "../../../assets/icons/sunny_icon_enable.svg",
    },
    {
      name: "Partly Cloudy",
      imageUrl: "../../../assets/icons/partly_cloudy_icon.svg",
      imageUrlEnable: "../../../assets/icons/partly_cloudy_icon_enable.svg",

    },

    {
      name: "Cloudy",
      imageUrl: "../../../assets/icons/cloudy_icon.svg",
      imageUrlEnable: "../../../assets/icons/cloudy_icon_enable.svg",

    },
    {
      name: "Light Rain",
      imageUrl: "../../../assets/icons/light_rain_icon.svg",
      imageUrlEnable: "../../../assets/icons/light_rain_icon_enable.svg",

    },
    {
      name: "Heavy Rain",
      imageUrl: "../../../assets/icons/heavy_rain_icon.svg",
      imageUrlEnable: "../../../assets/icons/heavy_rain_icon_enable.svg",

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

  constructor(private fb: FormBuilder, private orolService: OrolService, private router: Router, private imageCompress: NgxImageCompressService,
    private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private spinnerService: SpinnerService) {
      this.createForm();
      this.surroundingArray = this.activityForm.controls.surroundings as FormArray;

    }
    mapReady(event) {
      this.setCurrentPosition();
    }

    ngOnInit() {
      this.setCurrentTime();
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


    setCurrentTime() {
      let dt = new Date();
      let normalizeHour = dt.getHours() >= 13 ? dt.getHours() - 12 : dt.getHours();
      var hrs= normalizeHour.toString();
      let normalizeMins = dt.getMinutes();
      var mins=normalizeMins.toString();
      if(normalizeHour < 10){
        hrs = "0"+normalizeHour;
      }

      if(normalizeMins < 10){
        mins = "0"+mins;
      }

      var formattedTime = dt.getHours() >= 13 ? hrs + ':' + mins + 'PM' : hrs + ':' + mins + 'AM';
      this.activityForm.get('generalInformation').patchValue({
        activityTime: formattedTime
      });
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
          activityDate: [(new Date()), [Validators.required]],
          activityTime: ['', [Validators.required]],
          testerName: ['',  [Validators.required, Validators.maxLength(100)]],
          latitude: ['',[Validators.pattern(this.decimalPattern)]],
          longitude: ['',[Validators.pattern(this.decimalPattern)]],
          location: ['', [Validators.required, Validators.maxLength(200)]],
        }),
        waterLevelAndWeather: this.fb.group({
          airTemperature: ['', [Validators.required ,Validators.pattern(this.decimalPattern)]],
          waterLevel: ['', [Validators.required]],
          weather: ['', [Validators.required]],
        }),
        surroundings: this.fb.array([]),
        waterTesting: this.fb.group({
          waterTemperature: ['',[Validators.pattern(this.decimalPattern)]],
          pH: ['',[Validators.pattern(this.decimalPattern)]],
          dissolvedOxygen: ['',[Validators.pattern(this.decimalPattern)]],
          hardness: ['',[Validators.pattern(this.decimalPattern)]],
          nitrate: ['',[Validators.pattern(this.decimalPattern)]],
          nitrite: ['',[Validators.pattern(this.decimalPattern)]],
          chlorine: ['',[Validators.pattern(this.decimalPattern)]],
          alkalinity: ['',[Validators.pattern(this.decimalPattern)]],
          iron: ['',[Validators.pattern(this.decimalPattern)]],
          bacteria: ['',[Validators.pattern(this.decimalPattern)]],
          turbidity: ['',[Validators.pattern(this.decimalPattern)]],
          phosphate: ['',[Validators.pattern(this.decimalPattern)]],
          ammonia: ['',[Validators.pattern(this.decimalPattern)]],
          lead: ['',[Validators.pattern(this.decimalPattern)]],
          dissolvedSolids: ['',[Validators.pattern(this.decimalPattern)]],
          conductivity: ['',[Validators.pattern(this.decimalPattern)]],
        }),
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


onScroll() {
  this.pageNumber = this.pageNumber + 1;
}
getWaterTestDetails() {
  var user = JSON.parse(localStorage.getItem('User'));
  this.spinnerService.setSpinner(true);
  this.orolService.getWaterTestDetails().subscribe((data) => {
    if (data['count']) {
      this.reports = data['rows'].filter(r => r.userId == user.id);
    }
    this.spinnerService.setSpinner(false);
  });
}

createWaterTestDetails() {
  this.orolService.createWaterTestDetails(this.activityForm.value, this.imageFilesRiver,
    this.imageFilesSurrounding, this.imageFilesFlora, this.imageFilesFauna, this.imageFilesGroup, this.imageFilesActivity, this.imageFilesArtwork).
    subscribe((data) => {
      // console.log(data);
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
    this.imageUrlRiver = [];
    this.imageFilesRiver=[];
    this.imageUrlSurrounding = [];
    this.imageFilesSurrounding = [];
    this.imageUrlFlora = [];
    this.imageFilesFlora = [];
    this.imageUrlFauna = [];
    this.imageFilesFauna = [];
    this.imageUrlGroup = [];
    this.imageFilesGroup = [];
    this.imageUrlActivity = [];
    this.imageFilesActivity = [];
    this.imageUrlArtwork = [];
    this.imageFilesArtwork = [];


  }
  deleteRiverImage(){
    this.imageUrlRiver = [];
    this.imageFilesRiver=[];

  }
  deleteSurroundingImage(){
    this.imageUrlSurrounding = [];
    this.imageFilesSurrounding=[];
  }
  deleteFloraImage(){
    this.imageUrlFlora = [];
    this.imageFilesFlora = [];
  }
  deleteFaunaImage(){
    this.imageUrlFauna = [];
    this.imageFilesFauna = [];
  }
  deleteGroupImage(){
    this.imageUrlGroup = [];
    this.imageFilesGroup = [];
  }
  deleteActivityImage(){
    this.imageUrlActivity = [];
    this.imageFilesActivity = [];
  }
  deleteArtworkImage(){
    this.imageUrlArtwork = [];
    this.imageFilesArtwork = [];
  }
  compressFile(base64URL, filename, mode) {
    var orientation = -1;
    // this.imgResultBeforeCompress = base64URL;
    // console.log('Size in bytes was:', this.imageCompress.byteCount(base64URL));
    this.imageCompress.compressFile(base64URL, orientation, 50, 50).then(
      result => {
        if(mode == "river"){
          this.imageUrlRiver.push(result);
          this.imageFilesRiver.push(this.dataURLtoFile(result, filename));
          console.log(this.imageFilesRiver);

        }
        else if(mode == "surrounding"){
          this.imageUrlSurrounding.push(result);
          this.imageFilesSurrounding.push(this.dataURLtoFile(result, filename));
          console.log(this.imageFilesSurrounding);

        }
        else if(mode == "flora"){
          this.imageUrlFlora.push(result);
          this.imageFilesFlora.push(this.dataURLtoFile(result, filename));
          console.log(this.imageFilesFlora);

        }
        else if(mode == "fauna"){
          this.imageUrlFauna.push(result);
          this.imageFilesFauna.push(this.dataURLtoFile(result, filename));
          console.log(this.imageFilesFauna);

        }
        else if(mode == "activity"){
          this.imageUrlActivity.push(result);
          this.imageFilesActivity.push(this.dataURLtoFile(result, filename));
          console.log(this.imageFilesActivity);

        }
        else if(mode == "groupPicture"){
          this.imageUrlGroup.push(result);
          this.imageFilesGroup.push(this.dataURLtoFile(result, filename));
          console.log(this.imageFilesGroup);

        }
        else if(mode == "artwork"){
          this.imageUrlArtwork.push(result);
          this.imageFilesArtwork.push(this.dataURLtoFile(result, filename));
          console.log(this.imageFilesArtwork);

        }
      });
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

    selectRiverPhotos(event) {
      this.imageUrlRiver = [];
      this.imageFilesRiver=[];
      if (event.target.files && event.target.files[0]) {
        var length = event.target.files.length;
        for (let i = 0; i < event.target.files.length; i++) {
          setTimeout(() => {
            var _filename = "river_" + Date.now();
            console.log(Date.now());
            var reader = new FileReader();
            reader.onload = (event: any) => {
              this.compressFile(event.target.result, _filename, "river");

            }
            reader.readAsDataURL(event.target.files[i]);
          }, 1);

        }
      }
    }
    selectSurroundingPhotos(event) {
      this.imageUrlSurrounding = [];
      if (event.target.files && event.target.files[0]) {
        var length = event.target.files.length;
        for (let i = 0; i < event.target.files.length; i++) {
          setTimeout(() => {
            var _filename = "surrounding_" + Date.now();
            var reader = new FileReader();
            reader.onload = (event: any) => {
              this.compressFile(event.target.result, _filename,"surrounding");
            }
            reader.readAsDataURL(event.target.files[i]);
          }, 1);
        }
      }
    }
    selectFloraPhotos(event) {
      this.imageUrlFlora = [];
      if (event.target.files && event.target.files[0]) {
        var length = event.target.files.length;
        for (let i = 0; i < event.target.files.length; i++) {
          setTimeout(() => {
            var _filename = "flora_" + Date.now();
            var reader = new FileReader();
            reader.onload = (event: any) => {
              this.compressFile(event.target.result, _filename,"flora");

            }
            reader.readAsDataURL(event.target.files[i]);
          }, 1);
        }
      }
    }
    selectFaunaPhotos(event) {
      this.imageUrlFauna = [];
      if (event.target.files && event.target.files[0]) {
        var length = event.target.files.length;
        for (let i = 0; i < event.target.files.length; i++) {
          setTimeout(() => {
            var _filename = "fauna_" + Date.now();
            var reader = new FileReader();
            reader.onload = (event: any) => {
              this.compressFile(event.target.result, _filename, "fauna");

            }
            reader.readAsDataURL(event.target.files[i]);
          }, 1);
        }
      }
    }
    selectGroupPhotos(event) {
      this.imageUrlGroup = [];
      if (event.target.files && event.target.files[0]) {
        var length = event.target.files.length;
        for (let i = 0; i < event.target.files.length; i++) {
          setTimeout(() => {
            var _filename = "groupPicture_" + Date.now();
            var reader = new FileReader();
            reader.onload = (event: any) => {
              this.compressFile(event.target.result, _filename,"groupPicture");
            }
            reader.readAsDataURL(event.target.files[i]);
          }, 1);
        }
      }
    }
    selectActivityPhotos(event) {
      this.imageUrlActivity = [];
      if (event.target.files && event.target.files[0]) {
        var length = event.target.files.length;
        for (let i = 0; i < event.target.files.length; i++) {
          setTimeout(() => {
            var _filename = "activity_" + Date.now();
            var reader = new FileReader();
            reader.onload = (event: any) => {
              this.compressFile(event.target.result, _filename,"activity");
            }
            reader.readAsDataURL(event.target.files[i]);
          }, 1);
        }
      }
    }
    selectArtworkPhotos(event) {
      this.imageUrlArtwork = [];
      if (event.target.files && event.target.files[0]) {
        var length = event.target.files.length;
        for (let i = 0; i < event.target.files.length; i++) {
          setTimeout(() => {
            var _filename = "artwork_" + Date.now();
            var reader = new FileReader();
            reader.onload = (event: any) => {
              this.compressFile(event.target.result, _filename,"artwork");
            }
            reader.readAsDataURL(event.target.files[i]);
          }, 1);
        }
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
        }
      });
    }

    setWeather(name) {
      this.activityForm.patchValue({
        waterLevelAndWeather: {
          weather: name
        }
      });
    }

    setWaterLevel(name) {
      this.activityForm.patchValue({
        waterLevelAndWeather: {
          waterLevel: name
        }
      });
    }
    setBacteria(name) {
      this.activityForm.patchValue({
        waterTesting: {
          bacteria: name
        }
      });
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
