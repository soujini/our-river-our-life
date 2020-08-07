import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OngoingCampaignsRoutingModule } from './ongoing-campaigns-routing.module';
import { OngoingCampaignsComponent } from './ongoing-campaigns.component';


@NgModule({
  declarations: [OngoingCampaignsComponent],
  imports: [
    CommonModule,
    OngoingCampaignsRoutingModule
  ],
  exports:[
    OngoingCampaignsComponent
  ]
})
export class OngoingCampaignsModule { }
