import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AppRoutingModule } from './app-routing.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'; 
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { HomeComponent } from './components/home/home.component';
import { FloodWatchComponent } from './components/flood-watch/flood-watch.component';
import { FloraFaunaComponent } from './components/flora-fauna/flora-fauna.component';
import { ResearchComponent } from './components/research/research.component';
import { GoogleMapsModule } from '@angular/google-maps'
import { AgmCoreModule } from '@agm/core';
import { MDBBootstrapModulesPro, CarouselModule,CollapseModule , WavesModule,CardsModule, ButtonsModule,LightBoxModule,ModalModule,TabsModule} from 'ng-uikit-pro-standard';
import { ImagesGalleryComponent } from './components/images-gallery/images-gallery.component';
import { VideosGalleryComponent } from './components/videos-gallery/videos-gallery.component';
import { AboutComponent } from './components/about/about.component';
import { StoreComponent } from './components/store/store.component';
import { FooterComponent } from './components/footer/footer.component';
import { BannerComponent } from './components/banner/banner.component';
import { FeaturesComponent } from './components/features/features.component';
import { ContributorsComponent } from './components/contributors/contributors.component';
import { ImgLoadedDirective } from './directives/directive.directive';

// MDBBootstrapModulesPro

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    PrivacyPolicyComponent,
    HomeComponent,
    FloodWatchComponent,
    FloraFaunaComponent,
    ResearchComponent,
    ImagesGalleryComponent,
    VideosGalleryComponent,
    AboutComponent,
    StoreComponent,
    FooterComponent,
    BannerComponent,
    FeaturesComponent,
    ContributorsComponent,
    ImgLoadedDirective
  ],
  imports: [
    GoogleMapsModule,
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    CarouselModule,
    CollapseModule ,
    LightBoxModule,
    ModalModule,
    CardsModule,
    ButtonsModule,
    TabsModule,
    WavesModule,
    MDBBootstrapModulesPro.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyALR2ZDTTyZXGBRFeCV0AHd0S-TV_GWYm8",
      libraries: ["places"]
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
