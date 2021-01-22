import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';

import {OrolService} from '../../services/orol.service';
import {SpinnerService} from '../../services/spinner.service';
// import * as MarkerClusterer from "@google/markerclusterer"
@Component({
  selector: 'app-maps-flood-watch',
  templateUrl: './maps-flood-watch.component.html',
  styleUrls: ['./maps-flood-watch.component.scss']
})
export class MapsFloodWatchComponent implements OnInit {
  public zoom: number = 8; //maps zoom level
  // initial center position for the map
  public lat: number = 22.00;
  public lng: number = 77.00;
  public iconUrl = '../../../assets/icons/marker.svg';
  public markers: marker[] = [];

  constructor(private orolService: OrolService, private spinnerService:SpinnerService) {
    this.getFloodAlerts();
  }

  ngOnInit(){
  }
  clickedMarker(label: string, index: number ) {
    console.log(`clicked the marker: ${label || index}`)
  }

  mapClicked($event: MouseEvent) {
    // this.markers.push({
    //   latitude: $event.coords.lat,
    //   longitude: $event.coords.lng,
    //   draggable: true
    // });
  }

  // markerDragEnd(m: marker, $event: MouseEvent) {
  //   console.log('dragEnd', m, $event);
  // }


  getFloodAlerts() {
    // var a = this.orolService.getFloodAlerts();
    this.orolService.getFloodAlerts().subscribe((data)=>{
      if(data['count']){
        for(var i=0; i<data['rows'].length;i++){
          this.markers.push({
            latitude: data['rows'][i].latitude,
            longitude:data['rows'][i].longitude,
            label:data['rows'][i].location,
            location:data['rows'][i].location,
            photos:data['rows'][i].photos,
            activityDate:data['rows'][i].date,
            activityTime:data['rows'][i].time,
            experience:data['rows'][i].experience,
            draggable: false,
          });
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
  label?: string;
  draggable: boolean;
  location?: string;
  photos?: Array <string>;
  activityTime:string;
  activityDate: string;
  experience : string;
}
