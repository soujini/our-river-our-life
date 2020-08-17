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
    alert("clicked");
    // this.markers.push({
    //   latitude: $event.coords.lat,
    //   lng: $event.coords.lng,
    //   draggable: true
    // });
  }

  // markerDragEnd(m: marker, $event: MouseEvent) {
  //   console.log('dragEnd', m, $event);
  // }
  markers:marker[]=[];
  // markers: marker[] = [
  //   {
  //     latitude: 19.0760,
  //     lng: 72.8777,
  //     label: 'A',
  //     title:'Location 1',
  //     images: [
  //       '../../../assets/scalable-vector-graphics/fish_river_icon.svg',
  //       '../../../assets/scalable-vector-graphics/fish_river_icon.svg',
  //       '../../../assets/scalable-vector-graphics/fish_river_icon.svg',
  //     ],
  //     draggable: true
  //   },
  //   {
  //     lat: 12.384532,
  //     lng: 75.490376,
  //     label: 'B',
  //     title:'Location 2',
  //     images: [
  //       '../../../assets/scalable-vector-graphics/fish_river_icon.svg',
  //       '../../../assets/scalable-vector-graphics/fish_river_icon.svg',
  //       '../../../assets/scalable-vector-graphics/fish_river_icon.svg',
  //     ],
  //     draggable: false
  //   },
  // ]

  getFloodAlerts() {
    // console.log(this.imageFiles);
    // var a = this.orolService.getFloodAlerts();
    // alert(a);

    this.orolService.getFloodAlerts().subscribe((data)=>{
      // console.log(data.rows);
    //  if(data.rows){
    //   for(var i=0; i<data.rows.length;i++){
    //
    //     this.markers.push({
    //       latitude: data.rows[i].latitude,
    //       longitude:data.rows[i].longitude,
    //       label:data.rows[i].location,
    //       location:data.rows[i].location,
    //       photos:data.rows[i].photos,
    //       draggable: false,
    //     });
    //   }
    //   console.log(this.markers);
    // }
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
}
