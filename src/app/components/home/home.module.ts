import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { BannerComponent } from '../../components/banner/banner.component';
import { ImagesGalleryComponent } from '../../components/images-gallery/images-gallery.component';
import { FeaturesComponent } from '../../components/features/features.component';
//  import { MapsComponent } from '../../components/maps/maps.component';
import { MapsViewComponent } from '../../components/maps-view/maps-view.component';

 import { VideosGalleryComponent } from '../../components/videos-gallery/videos-gallery.component';
 import { ContributorsComponent } from '../../components/contributors/contributors.component';

import { MDBBootstrapModulesPro, CarouselModule,CollapseModule , WavesModule,CardsModule, ButtonsModule,LightBoxModule,ModalModule,TabsModule} from 'ng-uikit-pro-standard';
import {MatInputModule} from '@angular/material/input';
import { GoogleMapsModule } from '@angular/google-maps'
import { AgmCoreModule } from '@agm/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    CarouselModule,
    // CollapseModule ,
    // WavesModule,
    // CardsModule,
     ButtonsModule,
    // LightBoxModule,
    // ModalModule,
    // TabsModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModulesPro.forRoot(),
    GoogleMapsModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyALR2ZDTTyZXGBRFeCV0AHd0S-TV_GWYm8",
      libraries: ["places"]
    }),

  ],
  exports: [
    HomeComponent,
    BannerComponent,
    ImagesGalleryComponent,
    FeaturesComponent,
    // MapsComponent,
    MapsViewComponent,
    VideosGalleryComponent,
    ContributorsComponent
  ],
  declarations: [
    HomeComponent,
    BannerComponent,
    ImagesGalleryComponent,
    FeaturesComponent,
    // MapsComponent,
    MapsViewComponent,
    VideosGalleryComponent,
    ContributorsComponent
  ],
})
export class HomeModule { }
