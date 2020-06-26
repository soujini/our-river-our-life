import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 
import { AppRoutingModule } from './app-routing.module';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { HomeComponent } from './components/home/home.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { FloodWatchComponent } from './components/flood-watch/flood-watch.component';
import { FloraFaunaComponent } from './components/flora-fauna/flora-fauna.component';
import { ResearchComponent } from './components/research/research.component';
import { GoogleMapsModule } from '@angular/google-maps'
@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    PrivacyPolicyComponent,
    HomeComponent,
    TopNavComponent,
    FloodWatchComponent,
    FloraFaunaComponent,
    ResearchComponent
  ],
  imports: [
    GoogleMapsModule,
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
