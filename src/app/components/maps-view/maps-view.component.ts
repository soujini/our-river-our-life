import { Component } from '@angular/core';
import { MouseEvent } from '@agm/core';


@Component({
  selector: 'app-maps-view',
  templateUrl: './maps-view.component.html',
  styleUrls: ['./maps-view.component.scss']
})
export class MapsViewComponent  {
// google maps zoom level
zoom: number = 5;
  
// initial center position for the map
lat: number =20.5937;
lng: number = 78.9629;

clickedMarker(label: string, index: number ) {
  console.log(`clicked the marker: ${label || index}`)

}

mapClicked($event: MouseEvent) {
  this.markers.push({
    lat: $event.coords.lat,
    lng: $event.coords.lng,
    draggable: true
  });
}

markerDragEnd(m: marker, $event: MouseEvent) {
  console.log('dragEnd', m, $event);
}

markers: marker[] = [
  {
    lat: 19.0760,
    lng: 72.8777,
    label: 'A',
    title:'Location 1',
    images: [
       '../../../assets/scalable-vector-graphics/fish_river_icon.svg',
       '../../../assets/scalable-vector-graphics/fish_river_icon.svg',
       '../../../assets/scalable-vector-graphics/fish_river_icon.svg',
      ],
    draggable: true
  },
  {
    lat: 12.384532,
    lng: 75.490376,
    label: 'B',
    title:'Location 2',
    images: [
      '../../../assets/scalable-vector-graphics/fish_river_icon.svg',
      '../../../assets/scalable-vector-graphics/fish_river_icon.svg',
      '../../../assets/scalable-vector-graphics/fish_river_icon.svg',
     ],
    draggable: false
  },
  
]
}

// just an interface for type safety.
interface marker {
lat: number;
lng: number;
label?: string;
draggable: boolean;
title?: string;
images?: Array <string>;
}
