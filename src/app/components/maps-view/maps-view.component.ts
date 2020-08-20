import { Component } from '@angular/core';
import { MouseEvent } from '@agm/core';
import {OrolService} from '../../services/orol.service';

@Component({
  selector: 'app-maps-view',
  templateUrl: './maps-view.component.html',
  styleUrls: ['./maps-view.component.scss']
})
export class MapsViewComponent  {
  // google maps zoom level
  zoom: number=5;

  public iconUrl = '../../../assets/scalable-vector-graphics/flood-watch.svg';
  // initial center position for the map
  lat: number = 20.5937;
  lng: number = 78.9629;

  clickedMarker(label: string, index: number ) {
    console.log(`clicked the marker: ${label || index}`)

  }

  constructor(private orolService: OrolService
  ) {
    this.getFloodAlerts();
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
  // markers:marker[]=[];
  markers: marker[] = [];

  getFloodAlerts() {
    var a = this.orolService.getFloodAlerts();
    this.orolService.getFloodAlerts().subscribe((data)=>{
      if(data['count']){
        for(var i=0; i<data['count'];i++){
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
