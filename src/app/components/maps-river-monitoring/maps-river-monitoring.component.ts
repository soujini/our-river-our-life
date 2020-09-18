import { Component, OnInit } from '@angular/core';
import {OrolService} from '../../services/orol.service';
import {SpinnerService} from '../../services/spinner.service';

@Component({
  selector: 'app-maps-river-monitoring',
  templateUrl: './maps-river-monitoring.component.html',
  styleUrls: ['./maps-river-monitoring.component.scss']
})
export class MapsRiverMonitoringComponent implements OnInit {

  public zoom: number = 8; //maps zoom level
  // initial center position for the map
  public lat: number = 20.5937;
  public lng: number = 78.9629;
  public iconUrl = '../../../assets/scalable-vector-graphics/flood-watch.svg';
  public markers: marker[] = [];

  constructor(private orolService: OrolService, private spinnerService:SpinnerService) {
    this.getWaterTestDetails();
  }

  ngOnInit(){
  }
  clickedMarker(label: string, index: number, url:string ) {
    console.log(`clicked the marker: ${label || index}`)
    if(url != undefined && url != ''){
      window.open(url, "_blank");
    }
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
          console.log(data['rows'][i].generalInformation.latitude + ' ' + data['rows'][i].generalInformation.longitude);
          if(data['rows'][i].certificateURL != undefined && data['rows'][i].certificateURL != ''){
            this.markers.push({
              latitude: data['rows'][i].generalInformation.latitude,
              longitude:data['rows'][i].generalInformation.longitude,
               location:data['rows'][i].generalInformation.location,
               certificateURL:data['rows'][i].certificateURL,
              // location:data['rows'][i].location,
               // flora:data['rows'][i].flora
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

  }
  // just an interface for type safety.
  interface marker {
  latitude: number;
  longitude: number;
  // label?: string;
  // draggable: boolean;
   location?: string;
   certificateURL:string;
  // flora?: Array <string>;
  // activityTime:string;
  // activityDate: string;
  // experience : string;
  }
