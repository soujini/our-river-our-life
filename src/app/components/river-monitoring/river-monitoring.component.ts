import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Route, Router, NavigationStart, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { IMyOptions, MdbStepperComponent } from 'ng-uikit-pro-standard';
import { ModalDirective } from 'ng-uikit-pro-standard';
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
  images = [];
  centerLoc: any = {};
  imgResultBeforeCompress: string;
  imgResultAfterCompress = [];
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
  public imageFilesAtwork: File[] = [];
  imageUrlAtwork = [];
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
    let normalizeHour = dt.getHours() >= 13 ? dt.getHours() - 12 : dt.getHours()
    var formattedTime = dt.getHours() >= 13 ? normalizeHour + ':' + dt.getMinutes() + 'PM' : normalizeHour + ':' + dt.getMinutes() + 'AM';
    this.activityForm.get('generalInformation').patchValue({
      activityTime: formattedTime
    });
  }


  // getCurrentDate() {
  //   var dt = new Date();
  //   return dt.getDate();
  // }

  // getCurrentTime() {
  //   var d = new Date();
  //   d.setHours(d.getHours() + 2); // offset from local time
  //   var h = (d.getHours() % 12) || 12; // show midnight & noon as 12
  //   return (
  //     (h < 10 ? '0' : '') + h +
  //     (d.getMinutes() < 10 ? ':0' : ':') + d.getMinutes() +
  //     // optional seconds display
  //     // ( d.getSeconds() < 10 ? ':0' : ':') + d.getSeconds() +
  //     (d.getHours() < 12 ? ' AM' : ' PM')
  //   );

  // }
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
  move(index: number) {

    // this.river_monitoring_stepper.setNewActiveStep(1)
    // this.river_monitoring_stepper.selectedIndex = index;
  }

  // setSteep(tabName: string) {
  //   for (let i =0; i< document.querySelectorAll('.mdb-step-label-content').length; i++) {
  //     if ((<HTMLElement>document.querySelectorAll('.mdb-step-label-content')[i]).innerText == tabName) {
  //       (<HTMLElement>document.querySelectorAll('.mdb-step-label')[i]).click();
  //     }
  //   }
  // }
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
      this.imageFilesSurrounding, this.imageFilesFlora, this.imageFilesFauna, this.imageFilesGroup, this.imageFilesActivity, this.imageFilesAtwork).
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
    this.imageFilesRiver = [];
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
    this.imageUrlAtwork = [];
    this.imageFilesAtwork = [];


  }
  deleteRiverImage(){
    this.imageUrlRiver = [];
    this.imgResultAfterCompress = [];

  }
  deleteSurroundingImage(){
    this.imageUrlSurrounding = [];
    this.imgResultAfterCompress = [];
  }
  deleteFloraImage(){
    this.imageUrlFlora = [];
    this.imgResultAfterCompress = [];
  }
  deleteFaunaImage(){
    this.imageUrlFauna = [];
    this.imgResultAfterCompress = [];
  }
  deleteGroupImage(){
    this.imageUrlGroup = [];
    this.imgResultAfterCompress = [];
  }
  deleteActivityImage(){
    this.imageUrlActivity = [];
    this.imgResultAfterCompress = [];
  }
  deleteArtworkImage(){
    this.imageUrlAtwork = [];
    this.imgResultAfterCompress = [];
  }
  compressFile(base64URL, filename) {
    var orientation = -1;
    this.imgResultBeforeCompress = base64URL;
    // console.log('Size in bytes was:', this.imageCompress.byteCount(base64URL));
    this.imageCompress.compressFile(base64URL, orientation, 50, 50).then(
      result => {
        this.imgResultAfterCompress.push(result);
        // console.log('Size in bytes is now:', this.imageCompress.byteCount(result));
        this.imageFile = this.dataURLtoFile(result, filename);
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

  onFileChangesRiver(event) {
    this.imageUrlRiver = [];
    if (event.target.files && event.target.files[0]) {
      var length = event.target.files.length;
      for (let i = 0; i < event.target.files.length; i++) {
        this.imageFilesRiver.push(event.target.files[i]);
        var _filename = "river_" + Date.now();
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.imageUrlRiver.push(event.target.result);
          this.compressFile(event.target.result, _filename);

        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
  onFileChangesSurrounding(event) {
    this.imageUrlSurrounding = [];
    if (event.target.files && event.target.files[0]) {
      var length = event.target.files.length;
      for (let i = 0; i < event.target.files.length; i++) {
        this.imageFilesSurrounding.push(event.target.files[i]);
        var _filename = "surrounding_" + Date.now();
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.imageUrlSurrounding.push(event.target.result);
          this.compressFile(event.target.result, _filename);
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
  onFileChangesFlora(event) {
    this.imageUrlFlora = [];
    if (event.target.files && event.target.files[0]) {
      var length = event.target.files.length;
      for (let i = 0; i < event.target.files.length; i++) {
        this.imageFilesFlora.push(event.target.files[i]);
        var _filename = "flora_" + Date.now();
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.imageUrlFlora.push(event.target.result);
          this.compressFile(event.target.result, _filename);

        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
  onFileChangesFauna(event) {
    this.imageUrlFauna = [];
    if (event.target.files && event.target.files[0]) {
      var length = event.target.files.length;
      for (let i = 0; i < event.target.files.length; i++) {
        this.imageFilesFauna.push(event.target.files[i]);
        var _filename = "fauna_" + Date.now();
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.imageUrlFauna.push(event.target.result);
          this.compressFile(event.target.result, _filename);

        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
  onFileChangesGroup(event) {
    this.imageUrlGroup = [];
    if (event.target.files && event.target.files[0]) {
      var length = event.target.files.length;
      for (let i = 0; i < event.target.files.length; i++) {
        this.imageFilesGroup.push(event.target.files[i]);
        var _filename = "groupPicture_" + Date.now();
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.imageUrlGroup.push(event.target.result);
          this.compressFile(event.target.result, _filename);
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
  onFileChangesActivity(event) {
    this.imageUrlActivity = [];
    if (event.target.files && event.target.files[0]) {
      var length = event.target.files.length;
      for (let i = 0; i < event.target.files.length; i++) {
        this.imageFilesActivity.push(event.target.files[i]);
        var _filename = "activity_" + Date.now();
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.imageUrlActivity.push(event.target.result);
          this.compressFile(event.target.result, _filename);
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
  onFileChangesAtwork(event) {
    this.imageUrlAtwork = [];
    if (event.target.files && event.target.files[0]) {
      var length = event.target.files.length;
      for (let i = 0; i < event.target.files.length; i++) {
        this.imageFilesAtwork.push(event.target.files[i]);
        var _filename = "artwork_" + Date.now();
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.imageUrlAtwork.push(event.target.result);
          this.compressFile(event.target.result, _filename);

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
    // console.log(this.activityForm.value);
  }

  setWaterLevel(name) {
    this.activityForm.patchValue({
      waterLevelAndWeather: {
        waterLevel: name
      }
    });
    // console.log(this.activityForm.value);
  }
  setBacteria(name) {
    this.activityForm.patchValue({
      waterTesting: {
        bacteria: name
      }
    });
    // console.log(this.activityForm.value)
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
