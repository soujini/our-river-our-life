import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VoicesFromTheRiverComponent } from './voices-from-the-river.component';
import {AddBlogComponent} from '../add-blog/add-blog.component'
const routes: Routes = [
  { path: '', component: VoicesFromTheRiverComponent },
  { path: 'add-blog', component: AddBlogComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VoicesFromTheRiverRoutingModule { }
