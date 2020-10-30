import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup,FormArray, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { IMyOptions } from 'ng-uikit-pro-standard';
import { ModalDirective } from 'ng-uikit-pro-standard';
import { MapsAPILoader, AgmMap, MouseEvent } from '@agm/core';
import { NgZone } from '@angular/core';


@Component({
  selector: 'app-river-monitoring',
  templateUrl: './river-monitoring.component.html',
  styleUrls: ['./river-monitoring.component.scss']
})
export class RiverMonitoringComponent implements OnInit {
  @ViewChild('search', { static: true }) public searchElementRef: ElementRef;
  @ViewChild(AgmMap, { static: true }) public agmMap: AgmMap;
  defaultImageURL: string = "../../../assets/icons/default_image_upload.jpg";
  @ViewChild('basicModal') basicModal: ModalDirective;
  defaultImageURLTemp: string = "../../../assets/icons/default_image_upload.jpg";
  public imageFile: File = null;
  public imageFileTemp: File = null;
  imageFileErrorMessage: String = "";
  note = ".jpg, .jpeg, .png, files accepted";
  info = "(Max. size 250KB)";
  public searchControl: FormControl;
  geocoder: any;
  surroundingArray:any;

  lastClickedIndex;
  public myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd mmm yyyy',
    closeAfterSelect: true
  };
  images = [];
  centerLoc: any = {};
  public imageFiles: File[] = [];
  imageUrl = [];
  userControl = new FormControl();
  items = [
    { name: "Present" },
    { name: "Absent" },
  ];
  waterLevels = [
    {
      name: "Low",
      imageUrl: "../../../assets/scalable-vector-graphics/water_level_low_icon.svg",
    },
    {
      name: "Normal",
      imageUrl: "../../../assets/scalable-vector-graphics/water_level_normal_icon.svg",
    },

    {
      name: "High",
      imageUrl: "../../../assets/scalable-vector-graphics/water_level_high_icon.svg",
    },
    {
      name: "Flooded",
      imageUrl: "../../../assets/scalable-vector-graphics/water_level_flooded_icon.svg",
    },
  ];
  weatherCodition = [
    {
      name: "Sunny",
      imageUrl: "../../../assets/scalable-vector-graphics/sunny_icon.svg",
    },
    {
      name: "Partly Cloudy",
      imageUrl: "../../../assets/scalable-vector-graphics/partly_cloudy_icon.svg",
    },

    {
      name: "Cloudy",
      imageUrl: "../../../assets/scalable-vector-graphics/cloudy_icon.svg",
    },
    {
      name: "Light Rain",
      imageUrl: "../../../assets/scalable-vector-graphics/light_rain_icon.svg",
    },
    {
      name: "Heavy Rain",
      imageUrl: "../../../assets/scalable-vector-graphics/heavy_rain_icon.svg",
    },
  ];
  surroundings = [
    'Clothes washing',
    'Cattle grazing',
    'Vehicles',
    'Agricultural Land',
    'Plantation',
    'Bridge',
    'Industry',
    'Place of worship',
    'Village',
    'Town',
    'Effluent discharge',
    'Sewage discharge',
    'Irrigation Pump',
  ];

  // selectedUsers: User[] = new Array<User>();
  // filteredUsers: Observable<User[]>;
  lastFilter: string = '';

  activityForm: FormGroup;
  latitude: number;
  longitude: number;
  zoom: number;
  getAddress: any;
  lat: number;
  lng: number;
  constructor(private fb: FormBuilder,
    private mapsAPILoader: MapsAPILoader, private apiloader: MapsAPILoader, private ngZone: NgZone) {
    this.createForm();
    this.surroundingArray = this.activityForm.controls.surroundings as FormArray;     

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
          this.activityForm.get('generalInformation').patchValue({
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng(),
            location: place.formatted_address,
          });
          this.centerLoc = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
        });
      });
    });
    this.get()
    this.agmMap.triggerResize(true);
    this.zoom = 16;
    // this.filteredUsers = this.userControl.valueChanges.pipe(
    //   startWith<string | User[]>(''),
    //   map(value => typeof value === 'string' ? value : this.lastFilter),
    //   map(filter => this.filter(filter))
    // );
  }
  mapClicked($event: MouseEvent) {

    this.latitude = $event.coords.lat,
      this.longitude = $event.coords.lng


    this.apiloader.load().then(() => {
      let geocoder = new google.maps.Geocoder;
      let latlng = { lat: this.latitude, lng: this.longitude };

      geocoder.geocode({ 'location': latlng }, function (results) {
        if (results[0]) {
          this.currentLocation = results[0].formatted_address;
          console.log(this.currentLocation);
        } else {
          console.log('Not found');
        }
      });
    });
  }

  // filter(filter: string): User[] {
  //   this.lastFilter = filter;
  //   if (filter) {
  //     return this.users.filter(option => {
  //       return option.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
  //     })
  //   } else {
  //     return this.users.slice();
  //   }
  // }
  // displayFn(value: User[] | string): string | undefined {
  //   let displayValue: string;
  //   if (Array.isArray(value)) {
  //     value.forEach((user, index) => {
  //       if (index === 0) {
  //         displayValue = user.name;
  //       } else {
  //         displayValue += ', ' + user.name;
  //       }
  //     });
  //   } else {
  //     displayValue = value;
  //   }
  //   return displayValue;
  // }
 
  createForm() {
    this.activityForm = this.fb.group({
      userId: [''],
      generalInformation: this.fb.group({
        activityDate: [''],
        activityTime: [''],
        testerName: [''],
        location: [''],
        latitude: [''],
        longitude: [' '],
      }),
      waterLevelAndWeather: this.fb.group({
        airTemperature: [''],
        waterLevel: [' '],
        weather: [''],
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
        alkalinity: [' '],
        iron: [''],
        bacteria: [''],
        turbidity: [''],
        phosphate: [''],
        ammonia: [''],
        lead: [''],
        dissolvedSolids: [''],
        conductivity: [''],
        coliform: [''],

      }),
      flora: this.fb.group({
        imageURL: ['https://our-river-our-life-images.s3.ap-south-1.amazonaws.com/flora/IMG-20200803-WA0011.jpg'],
        description: [' '],

      }),
      fauna: this.fb.array([]),
      network: this.fb.array([]),
      groupPicture: this.fb.array([]),
      activity: this.fb.array([]),

      river: this.fb.group({
        imageURL: ['https://our-river-our-life-images.s3.amazonaws.com/river/IMG-20200803-WA0014.jpeg'],
        description: [' '],

      }),

      "certificateURL": "https://our-river-our-life-images.s3.ap-south-1.amazonaws.com/certificate/certificate_5f2806d31dbb0700178e94bf"

    });
  }


  onSubmit() {
    // do something here
  }
  // optionClicked(event: Event, user: User) {
  //   event.stopPropagation();
  //   this.toggleSelection(user);
  // }

  // toggleSelection(user: User) {
  //   user.selected = !user.selected;
  //   if (user.selected) {
  //     this.selectedUsers.push(user);
  //   } else {
  //     const i = this.selectedUsers.findIndex(value => value.name === user.name);
  //     this.selectedUsers.splice(i, 1);
  //   }
  //
  //   this.userControl.setValue(this.selectedUsers);
  // }
  createWaterTestDetails() {
    console.log(this.activityForm.value);
  }

  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      var length = event.target.files.length;
      for (let i = 0; i < event.target.files.length; i++) {
        this.imageFiles.push(event.target.files[i]);
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.images.push(event.target.result);
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }

  }
  onFileChanges(event) {
    if (event.target.files && event.target.files[0]) {
      var length = event.target.files.length;
      for (let i = 0; i < event.target.files.length; i++) {
        this.imageFiles.push(event.target.files[i]);
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.imageUrl.push(event.target.result);
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }

  }
 
  handleReaderLoadImage(readerEvent: any) {
    let binaryString = readerEvent.target.result;
    this.defaultImageURLTemp = 'data:image/png;base64,' + btoa(binaryString);
  }
  addImageFile(file: File) {
    this.imageFileTemp = file;

    if (this.imageFileTemp) {
      var mimeType = ["/"];
      mimeType = this.imageFileTemp.type.split('/');
      if (mimeType.length == 1) {
        this.imageFileErrorMessage = "Please choose a .jpg, .jpeg or a .png image";
      }

      else if (mimeType[1] != "jpg" && mimeType[1] != "png" && mimeType[1] != "jpeg") {
        this.imageFileErrorMessage = "Please choose a .jpg, .jpeg or a .png image";
      }
      else if (this.imageFileTemp.size > 256000) {
        this.imageFileErrorMessage = "File is too big!";
      }
      else {
        this.imageFileErrorMessage = "";
        let reader = new FileReader();
        reader.onload = this.handleReaderLoadImage.bind(this);
        reader.readAsBinaryString(this.imageFileTemp);
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

  // getBase64(file) {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = error => reject(error);
  //   });
  // }

  get() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        if (position) {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.getAddress = (this.lat, this.lng)
          console.log(position)

          this.apiloader.load().then(() => {
            let geocoder = new google.maps.Geocoder;
            let latlng = { lat: this.lat, lng: this.lng };

            geocoder.geocode({ 'location': latlng }, function (results) {
              if (results[0]) {
                this.currentLocation = results[0].formatted_address;

              } else {
                console.log('Not found');
              }
            });
          });
        }
      })
    }
  }

  private setCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        var accuracy = position.coords.accuracy;
        this.activityForm.patchValue({
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

  bla() {
    this.getAddressByLatitudeAndLongitude(this.activityForm.get('generalInformation').get('latitude').value, this.activityForm.get('generalInformation').get('longitude').value, this.activityForm);
    this.centerLoc = { lat: this.activityForm.get('generalInformation').get('latitude').value, lng: this.activityForm.get('generalInformation').get('longitude').value };
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
        alert("Geocoder failed due to: " + status + ". Please enter a valid latitide and longitude.")
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
  setEcoil(name){
    this.activityForm.patchValue({
      waterTesting: {
        coliform:name
      }
    });
   console.log(this.activityForm.value)
  }
  changeActive(i) {
    this.lastClickedIndex = i;
  }

  checkSelectedSurroundings(capability){
    let value ="-1";
    let index = this.surroundingArray.value.findIndex(record => record === capability);
    if(index != -1){
      value=this.surroundingArray.value[index];
    }
    return value;
  }

  getSelectedSurroundings(event){
    if(event.element.checked == true)
    {
      this.surroundingArray.push(this.fb.control(parseInt(event.element.value)));
    }
    else{
      let index = this.surroundingArray.value.findIndex( record => record === parseInt(event.element.value));
      if(index != -1){
        this.surroundingArray.removeAt(index);
      }
    }
  }
}
