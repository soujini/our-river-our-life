import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent} from './components/not-found/not-found.component';
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
  },

  {
    path: 'about',
    loadChildren: () => import('./components/about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'river-monitoring',
    loadChildren: () => import('./components/river-monitoring/river-monitoring.module').then(m => m.RiverMonitoringModule)
  },
  {
    path: 'flood-watch',
    loadChildren: () => import('./components/flood-watch/flood-watch.module').then(m => m.FloodWatchModule)
  },
  {
    path: 'flora-fauna',
    loadChildren: () => import('./components/flora-fauna/flora-fauna.module').then(m => m.FloraFaunaModule)
  },
  {
    path: 'voices-from-the-river',
    loadChildren: () => import('./components/voices-from-the-river/voices-from-the-river.module').then(m => m.VoicesFromTheRiverModule)
  },
  {
    path: 'ongoing-campaigns',
    loadChildren: () => import('./components/ongoing-campaigns/ongoing-campaigns.module').then(m => m.OngoingCampaignsModule)
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./components/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule)
  },
 
  {
	path: '',
	redirectTo: 'home',
	pathMatch: 'full'
},
{ path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
