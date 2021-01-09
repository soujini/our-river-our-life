import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
// import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AppRoutingModule } from './app-routing.module';
// import {MatFormFieldModule} from '@angular/material/form-field';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
// import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { FloraFaunaComponent } from './components/flora-fauna/flora-fauna.component';
import { MDBBootstrapModulesPro,CollapseModule ,CarouselModule, WavesModule,CardsModule, ButtonsModule,LightBoxModule,ModalModule,TabsModule} from 'ng-uikit-pro-standard';
import { StoreComponent } from './components/store/store.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyOTPComponent } from './components/verify-otp/verify-otp.component';

import { FooterComponent } from './components/footer/footer.component';
import { ImgLoadedDirective } from './directives/directive.directive';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NotFoundComponent } from './components/not-found/not-found.component';
// import { MapsComponent } from './components/maps/maps.component';
// import { GoogleMapsModule } from '@angular/google-maps'
// import { AgmCoreModule } from '@agm/core';
// import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';

// import { BannerWavesComponent } from './components/banner-waves/banner-waves.component';

import { AuthService } from "../app/shared/services/auth.service";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NgOtpInputModule } from 'ng-otp-input';
// import { FilterDateComponent } from './components/filter-date/filter-date.component';
// import { RecentPostComponent } from './components/recent-post/recent-post.component';
// import { AddBlogComponent } from './components/add-blog/add-blog.component';
// import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

// import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
// import { DashboardComponent } from './components/dashboard/dashboard.component';
// import { MapsViewComponent } from './components/maps-view/maps-view.component';
@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    // PrivacyPolicyComponent,
    StoreComponent,
    FooterComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyOTPComponent,
    ImgLoadedDirective,
    NotFoundComponent,
    // FilterDateComponent,
    // RecentPostComponent,
    // AddBlogComponent,
    // EditProfileComponent,
    // MapsFloodWatchComponent,
    // MapsRiverMonitoringComponent,
    // MapsFloraComponent,
    // MapsFaunaComponent,
    // BannerWavesComponent,
    // SignUpComponent,

    // VerifyEmailComponent,
    // DashboardComponent,
    // MapsViewComponent,
    // MapsComponent,
  ],
  imports: [
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    // GoogleMapsModule,
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    // MatAutocompleteModule,
    // MatFormFieldModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CarouselModule,
    CollapseModule ,
    // LightBoxModule,
    ModalModule,
    CardsModule,
    ButtonsModule,
    TabsModule,
    WavesModule,
    MDBBootstrapModulesPro.forRoot(),
    NgOtpInputModule,
    // AgmJsMarkerClustererModule,
    // AgmCoreModule.forRoot({
    //   apiKey: "AIzaSyALR2ZDTTyZXGBRFeCV0AHd0S-TV_GWYm8",
    //   libraries: ["places"]
    // }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
