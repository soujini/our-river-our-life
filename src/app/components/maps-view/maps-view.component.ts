import { Component } from '@angular/core';

@Component({
  selector: 'app-maps-view',
  templateUrl: './maps-view.component.html',
  styleUrls: ['./maps-view.component.scss']
})
export class MapsViewComponent  {
  mapsMode:number=1;

  constructor() {}
  selectMap(mode:number){
    this.mapsMode=mode;

  }
}
