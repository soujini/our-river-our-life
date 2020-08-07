import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FloraFaunaRoutingModule } from './flora-fauna-routing.module';
import { FloraFaunaComponent } from './flora-fauna.component';
 import {FormsModule, ReactiveFormsModule} from '@angular/forms';
 import {MatInputModule} from '@angular/material/input';
 import {MatAutocompleteModule} from '@angular/material/autocomplete';
 import {MatFormFieldModule} from '@angular/material/form-field';

 import { MDBBootstrapModulesPro, CarouselModule,CollapseModule , WavesModule,CardsModule, ButtonsModule,LightBoxModule,ModalModule,TabsModule} from 'ng-uikit-pro-standard';




@NgModule({
  declarations: [FloraFaunaComponent],
  imports: [
    CommonModule,
    FloraFaunaRoutingModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ModalModule,
    MDBBootstrapModulesPro.forRoot(),
    FormsModule, ReactiveFormsModule,
    LightBoxModule,
    WavesModule,
    MatInputModule

  ]
})
export class FloraFaunaModule { }
