import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FloodWatchRoutingModule } from './flood-watch-routing.module';
import { FloodWatchComponent } from './flood-watch.component';
// import { MapsComponent } from '../../components/maps/maps.component';
// import { MapsViewComponent } from '../../components/maps-view/maps-view.component';
import { GoogleMapsModule } from '@angular/google-maps'
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [FloodWatchComponent],
  imports: [
    CommonModule,
    FloodWatchRoutingModule,
    GoogleMapsModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyALR2ZDTTyZXGBRFeCV0AHd0S-TV_GWYm8",
      libraries: ["places"]
    }),
  ],
  exports:[
    FloodWatchComponent,
    // MapsViewComponent,
    // MapsComponent
  ]
})
export class FloodWatchModule { }
