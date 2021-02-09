import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent} from './components/home/home.component';
import { AboutComponent} from './components/about/about.component';
import { ResourcesComponent} from './components/resources/resources.component';
import { OngoingCampaignsComponent} from './components/ongoing-campaigns/ongoing-campaigns.component';
import { MyAccountComponent} from './components/my-account/my-account.component';
import { FloraFaunaComponent} from './components/flora-fauna/flora-fauna.component';
// import { VoicesFromTheRiverComponent} from './components/voices-from-the-river/voices-from-the-river.component';
// import { AddBlogComponent} from './components/add-blog/add-blog.component';
import { NotFoundComponent} from './components/not-found/not-found.component';
import { FloodWatchComponent} from './components/flood-watch/flood-watch.component';
import { PrivacyPolicyComponent} from './components/privacy-policy/privacy-policy.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'resources', component: ResourcesComponent },
  { path: 'ongoing-campaigns', component: OngoingCampaignsComponent },
  { path: 'my-account', component: MyAccountComponent },
  { path: 'flora-fauna', component: FloraFaunaComponent },
  {
  path: 'voices-from-the-river',
  loadChildren: () => import('./components/voices-from-the-river/voices-from-the-river.module').then(m => m.VoicesFromTheRiverModule)
},
{
  path: 'river-monitoring',
  loadChildren: () => import('./components/river-monitoring/river-monitoring.module').then(m => m.RiverMonitoringModule)
},
  { path: 'flood-watch', component: FloodWatchComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: '',redirectTo: 'home',pathMatch: 'full'},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
