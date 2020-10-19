import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProfileComponent } from './edit-profile.component';
import { EditProfileRoutingModule } from './edit-profile-routing.module';
import { TabsModule, WavesModule } from 'ng-uikit-pro-standard';
import { FormBuilder, FormControl,FormGroup, Validators, FormArray } from '@angular/forms';

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
