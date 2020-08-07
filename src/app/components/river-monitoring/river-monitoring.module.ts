import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RiverMonitoringRoutingModule } from './river-monitoring-routing.module';
import { RiverMonitoringComponent } from './river-monitoring.component';


@NgModule({
  declarations: [RiverMonitoringComponent],
  imports: [
    CommonModule,
    RiverMonitoringRoutingModule,
  ],
  exports:[
    RiverMonitoringComponent
  ]
})
export class RiverMonitoringModule { }
