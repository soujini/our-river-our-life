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


@NgModule({
  declarations: [RiverMonitoringComponent],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro.forRoot(),
    FormsModule,
    MdbFileUploadModule,
    ReactiveFormsModule,
    TabsModule,
    WavesModule,
    StepperModule,
    RiverMonitoringRoutingModule
    , MatListModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatFormFieldModule,


  ],
  exports: [
    RiverMonitoringComponent

  ]
})
export class RiverMonitoringModule { }
