import { ChangeDetectionStrategy } from '@angular/compiler/src/compiler_facade_interface';
import { ChangeDetectorRef, Component, EventEmitter,Output,OnInit } from '@angular/core';

@Component({
  selector: 'app-maps-view',
  templateUrl: './maps-view.component.html',
  styleUrls: ['./maps-view.component.scss']
})
export class MapsViewComponent implements OnInit {
  mapsMode:number=2;

  constructor(public cd:ChangeDetectorRef) {}

  ngOnInit(){
  }
  selectMap(mode:number){
    this.mapsMode=mode;
  }

}
