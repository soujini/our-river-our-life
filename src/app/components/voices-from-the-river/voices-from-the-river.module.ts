import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule} from '@angular/forms';
import { VoicesFromTheRiverRoutingModule } from './voices-from-the-river-routing.module';
import { VoicesFromTheRiverComponent } from './voices-from-the-river.component';
import {  ModalModule, WavesModule ,  ButtonsModule} from 'ng-uikit-pro-standard';


@NgModule({
  declarations: [VoicesFromTheRiverComponent],
  imports: [
    CommonModule,
    VoicesFromTheRiverRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule,
    WavesModule,
    ButtonsModule
  ],
  exports:[
    VoicesFromTheRiverComponent
  ]
})
export class VoicesFromTheRiverModule { }
