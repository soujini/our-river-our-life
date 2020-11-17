import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VoicesFromTheRiverComponent } from './voices-from-the-river.component';

const routes: Routes = [
  { path: '', component: VoicesFromTheRiverComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VoicesFromTheRiverRoutingModule { }
