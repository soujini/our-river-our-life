import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CarouselModule, WavesModule} from 'ng-uikit-pro-standard';
import { OngoingCampaignsRoutingModule } from './ongoing-campaigns-routing.module';
import { OngoingCampaignsComponent } from './ongoing-campaigns.component';


@NgModule({
  declarations: [OngoingCampaignsComponent],
  imports: [
    CommonModule,
    CarouselModule,
    WavesModule,
    OngoingCampaignsRoutingModule
  ],
  exports:[
    OngoingCampaignsComponent
  ]
})
export class OngoingCampaignsModule { }
