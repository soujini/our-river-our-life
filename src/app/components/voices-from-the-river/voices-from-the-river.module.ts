import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule} from '@angular/forms';
import { VoicesFromTheRiverRoutingModule } from './voices-from-the-river-routing.module';
import { VoicesFromTheRiverComponent } from './voices-from-the-river.component';
import {  ModalModule, WavesModule , InputsModule, ButtonsModule} from 'ng-uikit-pro-standard';
import {AddBlogComponent} from '../add-blog/add-blog.component';
@NgModule({
  declarations: [
    VoicesFromTheRiverComponent,
    AddBlogComponent
  ],
  imports: [
    CommonModule,
    VoicesFromTheRiverRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    InputsModule,
    ModalModule,
    WavesModule,
    ButtonsModule
  ],
  exports:[
    VoicesFromTheRiverComponent,
    AddBlogComponent
  ]
})
export class VoicesFromTheRiverModule { }
