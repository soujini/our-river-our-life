import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { IMyOptions } from 'ng-uikit-pro-standard';
import { ModalDirective } from 'ng-uikit-pro-standard';


export class User {
  constructor(public name: string, public selected?: boolean) {
    if (selected === undefined) selected = false;
  }
}
@Component({
  selector: 'app-river-monitoring',
  templateUrl: './river-monitoring.component.html',
  styleUrls: ['./river-monitoring.component.scss']
})
export class RiverMonitoringComponent implements OnInit {
  defaultImageURL: string = "../../../assets/icons/default_image_upload.jpg";
  @ViewChild('basicModal') basicModal: ModalDirective;
  defaultImageURLTemp: string = "../../../assets/icons/default_image_upload.jpg";
  public imageFile: File = null;
  public imageFileTemp: File = null;
  imageFileErrorMessage: String = "";
  note = ".jpg, .jpeg, .png, files accepted";
  info = "(Max. size 250KB)";
  public searchControl: FormControl;
  lastClickedIndex;
  public myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd mmm yyyy',
    closeAfterSelect: true
  };
  images = [];
  public imageFiles: File[] = [];
  imageUrl = [];
  userControl = new FormControl();
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
      name: "Partly",
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
  data: any = [
    {
      name: "Clothers Washing",
    },
    {
      name: "Vehicles",
    },
    {
      name: "Agricultural Land",
    },
    {
      name: "Irrigation Pump",
    },
    {
      name: "Cattle Grazing",
    },
    {
      name: "Plantation",
    },
    {
      name: "Bridge",
    },
    {
      name: "Industry",
    },
    {
      name: "Effluent Discharge",
    },
    {
      name: "Places of Workship",
    },
    {
      name: "Village",
    },
    {
      name: "Town",
    },
    {
      name: "Industry",
    },
  ];
  users = [
    new User('Clothers Washing'),
    new User('Vehicles'),
    new User('Agricultural Land'),
    new User('Irrigation Pump'),
    new User('Cattle Grazing'),
    new User('Plantation'),
    new User('Bridge'),
    new User('Industry'),
    new User('Effluent Discharge'),
    new User('Places of Workship'),
    new User('Village'),
    new User('Town'),
    new User('Industry')
  ];


  selectedUsers: User[] = new Array<User>();

  filteredUsers: Observable<User[]>;
  lastFilter: string = '';


  activityForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.createForm();
  }
  ngOnInit() {

    this.filteredUsers = this.userControl.valueChanges.pipe(
      startWith<string | User[]>(''),
      map(value => typeof value === 'string' ? value : this.lastFilter),
      map(filter => this.filter(filter))
    );
  }

  filter(filter: string): User[] {
    this.lastFilter = filter;
    if (filter) {
      return this.users.filter(option => {
        return option.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
      })
    } else {
      return this.users.slice();
    }
  }
  displayFn(value: User[] | string): string | undefined {
    let displayValue: string;
    if (Array.isArray(value)) {
      value.forEach((user, index) => {
        if (index === 0) {
          displayValue = user.name;
        } else {
          displayValue += ', ' + user.name;
        }
      });
    } else {
      displayValue = value;
    }
    return displayValue;
  }
  items = [
    { name: 'Present' },
    { name: 'Absent' },

  ];
  createForm() {
    this.activityForm = this.fb.group({
      userId: ['5f211e663b3f8d19180f16a6'],
      generalInformation: this.fb.group({
        activityDate: ['03 Aug 2020'],
        activityTime: [' 6:06 PM'],
        testerName: ['Aravind'],
        location: ['Hebbal, Karnataka'],
        latitude: ['13.0307684'],
        longitude: [' 77.5912898'],
      }),
      waterLevelAndWeather: this.fb.group({
        airTemperature: ['21'],
        waterLevel: [' '],
        weather: ['Partly Cloudy'],
      }),
      surroundings: this.fb.group({
        agriculturalLand: [''],
        Plantation: [' '],

      }),
      waterTesting: this.fb.group({
        waterTemperature: ['21'],
        pH: ['11 '],
        dissolvedOxygen: ['7 '],
        hardness: ['5 '],
        nitrate: ['10.2'],
        nitrite: ['2.2 '],
        chlorine: ['80 '],
        alkalinity: ['19 '],
        iron: ['12 '],
        bacteria: ['24 '],
        turbidity: ['74 '],
        phosphate: ['23 '],
        ammonia: ['11'],
        lead: ['34 '],
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
  optionClicked(event: Event, user: User) {
    event.stopPropagation();
    this.toggleSelection(user);
  }

  toggleSelection(user: User) {
    user.selected = !user.selected;
    if (user.selected) {
      this.selectedUsers.push(user);
    } else {
      const i = this.selectedUsers.findIndex(value => value.name === user.name);
      this.selectedUsers.splice(i, 1);
    }

    this.userControl.setValue(this.selectedUsers);
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
  changeActive(i) {
    this.lastClickedIndex = i;
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
  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
}
