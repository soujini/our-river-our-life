import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule, WavesModule, StepperModule, MDBBootstrapModulesPro } from 'ng-uikit-pro-standard'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RiverMonitoringRoutingModule } from './river-monitoring-routing.module';
import { RiverMonitoringComponent } from './river-monitoring.component';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MdbFileUploadModule } from 'mdb-file-upload';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GoogleMapsModule } from '@angular/google-maps'
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';


@NgModule({
  declarations: [RiverMonitoringComponent],
  imports: [
    FlexLayoutModule,
    CommonModule,
    MDBBootstrapModulesPro.forRoot(),
    FormsModule,
    MdbFileUploadModule,
    ReactiveFormsModule,
    TabsModule,
    WavesModule,
    StepperModule,
    RiverMonitoringRoutingModule,
     MatListModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatFormFieldModule,
    AgmJsMarkerClustererModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyALR2ZDTTyZXGBRFeCV0AHd0S-TV_GWYm8",
      libraries: ["places"]
    })

  ],
  exports: [
    RiverMonitoringComponent

  ]
})
export class RiverMonitoringModule { }
