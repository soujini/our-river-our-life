import { Component, OnInit } from '@angular/core';

import {OrolService} from '../../services/orol.service';
import {SpinnerService} from '../../services/spinner.service';
@Component({
  selector: 'app-maps-flora',
  templateUrl: './maps-flora.component.html',
  styleUrls: ['./maps-flora.component.scss']
})
export class MapsFloraComponent implements OnInit {

  public zoom: number = 8; //maps zoom level
  // initial center position for the map
  public lat: number = 20.5937;
  public lng: number = 78.9629;
  public iconUrl = '../../../assets/icons/marker.svg';
  public markers: marker[] = [];

  constructor(private orolService: OrolService, private spinnerService:SpinnerService) {
    this.getWaterTestDetails();
    this.getFlora();
  }

  ngOnInit(){
  }
  clickedMarker(label: string, index: number ) {
    console.log(`clicked the marker: ${label || index}`)
  }
  mapClicked($event: MouseEvent) {
    // alert("clicked");
    // this.markers.push({
    //   latitude: $event.coords.lat,
    //   longitude: $event.coords.lng,
    //   draggable: true
    // });
  }

  // markerDragEnd(m: marker, $event: MouseEvent) {
  //   console.log('dragEnd', m, $event);
  // }

  getWaterTestDetails() {
    // var a = this.orolService.getFloodAlerts();
    this.orolService.getWaterTestDetails().subscribe((data)=>{
      if(data['count']){
        for(var i=0; i<data['rows'].length;i++){
          if(data['rows'][i].flora.length > 0){
            this.markers.push({
              latitude: data['rows'][i].generalInformation.latitude,
              longitude:data['rows'][i].generalInformation.longitude,
               location:data['rows'][i].generalInformation.location,
              // location:data['rows'][i].location,
               flora:data['rows'][i].flora
              // activityDate:data['rows'][i].date,
              // activityTime:data['rows'][i].time,
              // experience:data['rows'][i].experience,
              // draggable: false,
            });
          }

        }
      }
      this.spinnerService.setSpinner(false);
    });
  }
  getFlora() {
    this.spinnerService.setSpinner(true);
    this.orolService.getFloraFauna().subscribe((data)=>{
      if(data['count']){
        for(var i=0; i<data['rows'].length;i++){
          if(data['rows'][i].flora.length > 0){
            this.markers.push({
              latitude: data['rows'][i].latitude,
              longitude:data['rows'][i].longitude,
               location:data['rows'][i].location,
               flora:data['rows'][i].flora
            });
          }
        }
      }
      this.spinnerService.setSpinner(false);
    });
  }

  }
  // just an interface for type safety.
  interface marker {
  latitude: number;
  longitude: number;
  // label?: string;
  // draggable: boolean;
   location?: string;
  flora?: Array <string>;
  // activityTime:string;
  // activityDate: string;
  // experience : string;
  }
