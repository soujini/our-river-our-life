import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { VoicesFromTheRiverRoutingModule } from './voices-from-the-river-routing.module';
import { VoicesFromTheRiverComponent } from './voices-from-the-river.component';
import { ModalModule, WavesModule, TabsModule, InputsModule, ButtonsModule, CarouselModule } from 'ng-uikit-pro-standard';
import { AddBlogComponent } from '../add-blog/add-blog.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
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
    TabsModule,
    InputsModule,
    CarouselModule,
    ModalModule,
    WavesModule,
    ButtonsModule,
    InfiniteScrollModule
  ],
  exports: [
    VoicesFromTheRiverComponent,
    AddBlogComponent
  ]
})
export class VoicesFromTheRiverModule { }
