import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivacyPolicyRoutingModule } from  './privacy-policy-routing.module';
import { PrivacyPolicyComponent } from './privacy-policy.component';

@NgModule({
  imports: [
    CommonModule,
    PrivacyPolicyRoutingModule
  ],
  exports: [
    PrivacyPolicyComponent,
  ],
  declarations: [
    PrivacyPolicyComponent,
  ],
})

export class PrivacyPolicyModule { }
