import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RiverMonitoringComponent } from './river-monitoring.component';

const routes: Routes = [
  { path: '', component: RiverMonitoringComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RiverMonitoringRoutingModule { }
