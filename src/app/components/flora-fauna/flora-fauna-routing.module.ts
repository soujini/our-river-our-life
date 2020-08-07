import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FloraFaunaComponent } from './flora-fauna.component';

const routes: Routes = [
  { path: '', component: FloraFaunaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FloraFaunaRoutingModule { }
