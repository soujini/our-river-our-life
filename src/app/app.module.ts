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
import { FooterComponent } from './components/footer/footer.component';
import { ImgLoadedDirective } from './directives/directive.directive';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NotFoundComponent } from './components/not-found/not-found.component';
// import { MapsComponent } from './components/maps/maps.component';
import { GoogleMapsModule } from '@angular/google-maps'
// import { AgmCoreModule } from '@agm/core';
// import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';

// import { BannerWavesComponent } from './components/banner-waves/banner-waves.component';

// import { MapsViewComponent } from './components/maps-view/maps-view.component';
@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    // PrivacyPolicyComponent,
    StoreComponent,
    FooterComponent,
    ImgLoadedDirective,
    NotFoundComponent,
    // MapsFloodWatchComponent,
    // MapsRiverMonitoringComponent,
    // MapsFloraComponent,
    // MapsFaunaComponent,
    // BannerWavesComponent,
    // MapsViewComponent,
    // MapsComponent,
  ],
  imports: [
    GoogleMapsModule,
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
    // AgmJsMarkerClustererModule,
    // AgmCoreModule.forRoot({
    //   apiKey: "AIzaSyALR2ZDTTyZXGBRFeCV0AHd0S-TV_GWYm8",
    //   libraries: ["places"]
    // }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
