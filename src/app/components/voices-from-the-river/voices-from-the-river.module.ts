import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoicesFromTheRiverRoutingModule } from './voices-from-the-river-routing.module';
import { VoicesFromTheRiverComponent } from './voices-from-the-river.component';


@NgModule({
  declarations: [VoicesFromTheRiverComponent],
  imports: [
    CommonModule,
    VoicesFromTheRiverRoutingModule
  ],
  exports:[
    VoicesFromTheRiverComponent
  ]
})
export class VoicesFromTheRiverModule { }
