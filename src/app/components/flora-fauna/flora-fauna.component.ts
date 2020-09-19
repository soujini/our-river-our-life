import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
declare var google;
import {OrolService} from '../../services/orol.service';
import {SpinnerService} from '../../services/spinner.service';



@Component({
  selector: 'app-flora-fauna',
  templateUrl: './flora-fauna.component.html',
  styleUrls: ['./flora-fauna.component.scss']
})
export class FloraFaunaComponent implements OnInit {
  selectedProject;
  selectedProperty;
  product;
  myControl = new FormControl();
  public searchControl: FormControl;
  public imageFiles: File[]=[];
  applicationType:any="";
  applicationTypeName:string="Choose type";
  urls = [];
  options = [
  { value: '1', label: 'Flora' },
  { value: '2', label: 'Fauna' },
];
  //
  // public types:any = [
  //   {id: "Flora", name:"Flora", displayName:"Flora",},
  //   {id: "Fauna",name:"Fauna", displayName:"Fauna",},
  //
  // ];


  projects = [
    {
      key: 1, value: "Flora",
    },
    {
      key: 2, value: "Fauna",
    },
  ]
  resource: any;
  resources_mock: any = [
    {
      iconUrl: '',
      clientId: "1",
      name: "Coneflower",
    },
    {
      clientId: "2",
      name: "Tulips",
    },
    {
      clientId: "3",
      name: "Geraniums",
    },
    {
      clientId: "4",
      name: "Milli",
    },
    {
      clientId: "5",
      name: "Rose",
    },
    {
      clientId: "6",
      name: "Beetle",
    },
  ];
  fauna :any =[];
  flora :any =[];
  images = [
    {
      img: 'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(145).jpg', thumb:
      'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(145).jpg', description: 'Image 1'
    },
    {
      img: 'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(150).jpg', thumb:
      'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(150).jpg', description: 'Image 2'
    },
    {
      img: 'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(152).jpg', thumb:
      'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(152).jpg', description: 'Image 3'
    },
    {
      img: 'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(42).jpg', thumb:
      'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(42).jpg', description: 'Image 4'
    },
    {
      img: 'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(151).jpg', thumb:
      'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(151).jpg', description: 'Image 5'
    },
    {
      img: 'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(40).jpg', thumb:
      'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(40).jpg', description: 'Image 6'
    },
    {
      img: 'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(148).jpg', thumb:
      'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(148).jpg', description: 'Image 7'
    },
    {
      img: 'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(147).jpg', thumb:
      'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(147).jpg', description: 'Image 8'
    },
    {
      img: 'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(149).jpg', thumb:
      'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(149).jpg', description: 'Image 9'
    }
  ];
  geocoder: any;
  centerLoc:any={};
  addForm: FormGroup;
  constructor(private fb: FormBuilder,private orolService: OrolService, private spinnerService:SpinnerService) {
    this.createForm();
  }

  ngOnInit() {
    this.searchControl = new FormControl();
    this.getSearchResource();
    this.getWaterTestDetails();
  }
  changeProject(e) {
    if (e.target.value == 1) {
      console.log("Project One");
    }
    else if (e.target.value == 2) {
      console.log("Project Two");
    }
    else if (e.target.value == 3) {
      console.log("Project Three");
    }
    this.setProducts();
  }
  private setProducts() {
    if ((this.selectedProject === "Project two" && this.selectedProperty === 'PC103') || (this.selectedProject === "Project three" && this.selectedProperty === 'PC102')) {

      let potentialProduct = [
        {
          key: 123, value: `${this.selectedProperty}PROD123`,
        },
        {
          key: 456, value: `${this.selectedProperty}PROD456`,
        },
        {
          key: 789, value: `${this.selectedProperty}PROD789`,
        }
      ]

      this.product = potentialProduct;
    } else {
      this.product = [];
    }
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event:any) => {
          console.log(event.target.result);
          this.urls.push(event.target.result);
        }

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  getSearchResource() {
    this.resource = this.resources_mock;

  }
  getWaterTestDetails() {
    this.orolService.getWaterTestDetails().subscribe((data)=>{
      if(data['count']){
        for(var i=0; i<data['rows'].length;i++){
          if(data['rows'][i].fauna.length > 0){
            for(var j=0; j<data['rows'][i].fauna.length;j++){
              // alert(data['rows'][i].fauna[j].imageURL);
              this.fauna.push({
                img: data['rows'][i].fauna[j].imageURL,
                thumb:data['rows'][i].fauna[j].imageURL,
              });
            }
            for(var j=0; j<data['rows'][i].flora.length;j++){
              // alert(data['rows'][i].fauna[j].imageURL);
              this.flora.push({
                img: data['rows'][i].flora[j].imageURL,
                thumb:data['rows'][i].flora[j].imageURL,
              });
            }
            // this.fauna.push({
            //    img: data['rows'][i].fauna.imageURL,
            //    thumb:data['rows'][i].fauna.imageURL,
            //   // location:data['rows'][i].generalInformation.location,
            //   // // location:data['rows'][i].location,
            //   // fauna:data['rows'][i].fauna
            //   // activityDate:data['rows'][i].date,
            //   // activityTime:data['rows'][i].time,
            //   // experience:data['rows'][i].experience,
            //   // draggable: false,
            // });
          }
          console.log(this.fauna);

        }
      }
      this.spinnerService.setSpinner(false);
    });
  }
  createForm() {
    this.addForm = this.fb.group({
      type:[''],
      location: [''],
      commonName: [],
      localName: [],
      scientificName: [],
      latitude: [23.074290],
      longitude: [79.134113],
      photos: this.fb.array([]),
    });
  }
  selectApplicationType(event){
    this.applicationType = event.target.value;
    this.addForm.patchValue({
      type:event.target.value,
    });
    this.applicationTypeName=event.target.name;
  }
  bla(){
    this.getAddressByLatitudeAndLongitude(this.addForm.get('latitude').value, this.addForm.get('longitude').value, this.addForm);
    this.centerLoc = { lat: this.addForm.get('latitude').value, lng: this.addForm.get('longitude').value };
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
  valueChange() {

  }
}
