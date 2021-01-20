import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MDBBootstrapModulesPro,IconsModule,CollapseModule ,CarouselModule, WavesModule,CardsModule, ButtonsModule,LightBoxModule,ModalModule,TabsModule, NavbarModule} from 'ng-uikit-pro-standard';
import { HomeComponent } from './components/home/home.component';
import { BannerComponent } from './components/banner/banner.component';
import { FeaturesComponent } from './components/features/features.component';
import { RiverscapesComponent } from './components/riverscapes/riverscapes.component';
import { MapsViewComponent } from './components/maps-view/maps-view.component';
import { MapsFaunaComponent } from './components/maps-fauna/maps-fauna.component';
import { MapsFloraComponent } from './components/maps-flora/maps-flora.component';
import { MapsFloodWatchComponent } from './components/maps-flood-watch/maps-flood-watch.component';
import { MapsRiverMonitoringComponent } from './components/maps-river-monitoring/maps-river-monitoring.component';

// import { GoogleMapsModule } from '@angular/google-maps'
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { ContributorsComponent } from './components/contributors/contributors.component';
import { FooterComponent } from './components/footer/footer.component';
import { VideosGalleryComponent } from './components/videos-gallery/videos-gallery.component';
import { RecentBlogPostComponent } from './components/recent-blog-post/recent-blog-post.component';
import { AboutComponent } from './components/about/about.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { OngoingCampaignsComponent } from './components/ongoing-campaigns/ongoing-campaigns.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { VerifyOtpComponent } from './components/verify-otp/verify-otp.component';

import { AuthService } from "../app/shared/services/auth.service";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FloraFaunaComponent } from './components/flora-fauna/flora-fauna.component';
import { GoogleMapsModule } from '@angular/google-maps';
import {NgxImageCompressService} from 'ngx-image-compress';
// import { VoicesFromTheRiverComponent } from './components/voices-from-the-river/voices-from-the-river.component';
// import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { FloodWatchComponent } from './components/flood-watch/flood-watch.component';
import { MapsComponent } from './components/maps/maps.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
// import { RiverMonitoringComponent } from './components/river-monitoring/river-monitoring.component';
import { FilterDateComponent } from './components/filter-date/filter-date.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    HomeComponent,
    BannerComponent,
    FeaturesComponent,
    RiverscapesComponent,
    MapsViewComponent,
    MapsFaunaComponent,
    MapsFloraComponent,
    MapsFloodWatchComponent,
    MapsRiverMonitoringComponent,
    ContributorsComponent,
    FooterComponent,
    VideosGalleryComponent,
    RecentBlogPostComponent,
    AboutComponent,
    ResourcesComponent,
    OngoingCampaignsComponent,
    MyAccountComponent,
    SignInComponent,
    SignUpComponent,
    VerifyEmailComponent,
    VerifyOtpComponent,
    FloraFaunaComponent,
    // VoicesFromTheRiverComponent,
    // AddBlogComponent,
    NotFoundComponent,
    ForgotPasswordComponent,
    FloodWatchComponent,
    MapsComponent,
    PrivacyPolicyComponent,
    // RiverMonitoringComponent,
    FilterDateComponent
  ],
  imports: [
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MDBBootstrapModulesPro.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CarouselModule,
    CollapseModule ,
    IconsModule,
    // LightBoxModule,
    NavbarModule,
    ModalModule,
    CardsModule,
    ButtonsModule,
    TabsModule,
    WavesModule,
    GoogleMapsModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyALR2ZDTTyZXGBRFeCV0AHd0S-TV_GWYm8",
      libraries: ["places"]
    }),
    AgmJsMarkerClustererModule,
    // MatToolbarModule
  ],
  providers: [AuthService,NgxImageCompressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
