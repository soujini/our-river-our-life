import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProfileComponent } from './edit-profile.component';
import { EditProfileRoutingModule } from './edit-profile-routing.module';
import { TabsModule, WavesModule } from 'ng-uikit-pro-standard'

@NgModule({
  declarations: [EditProfileComponent],
  imports: [
    CommonModule,TabsModule,WavesModule,
    EditProfileRoutingModule
  ],
  exports:[
    EditProfileComponent
  ]
})
export class EditProfileModule { }
