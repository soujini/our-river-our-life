import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FloraFaunaRoutingModule } from './flora-fauna-routing.module';
import { FloraFaunaComponent } from './flora-fauna.component';
 import {FormsModule, ReactiveFormsModule} from '@angular/forms';
 import {MatInputModule} from '@angular/material/input';
 import {MatAutocompleteModule} from '@angular/material/autocomplete';
 import {MatFormFieldModule} from '@angular/material/form-field';
 import { GoogleMapsModule } from '@angular/google-maps'
 import { AgmCoreModule } from '@agm/core';
 import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
 import { InfiniteScrollModule } from 'ngx-infinite-scroll';

 import { MDBBootstrapModulesPro, CarouselModule,CollapseModule , WavesModule,CardsModule, ButtonsModule,LightBoxModule,ModalModule,TabsModule} from 'ng-uikit-pro-standard';




@NgModule({
  declarations: [FloraFaunaComponent],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    FloraFaunaRoutingModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ModalModule,
    MDBBootstrapModulesPro.forRoot(),
    FormsModule, ReactiveFormsModule,
    LightBoxModule,
    WavesModule,
    MatInputModule,
    AgmJsMarkerClustererModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyALR2ZDTTyZXGBRFeCV0AHd0S-TV_GWYm8",
      libraries: ["places"]
    })

  ]
})
export class FloraFaunaModule { }
