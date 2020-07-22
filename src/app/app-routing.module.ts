import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TopNavComponent} from './components/top-nav/top-nav.component';
import { HomeComponent} from './components/home/home.component';
import { FloodWatchComponent} from './components/flood-watch/flood-watch.component';
import { FloraFaunaComponent} from './components/flora-fauna/flora-fauna.component';
import { ResearchComponent} from './components/research/research.component';
import { PrivacyPolicyComponent} from './components/privacy-policy/privacy-policy.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  
  {
    path: 'flood-watch',
    component: FloodWatchComponent
  },
  {
    path: 'flora-fauna',
    component: FloraFaunaComponent
  },
  {
    path: 'research',
    component: ResearchComponent
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  },
  {
	path: '',
	redirectTo: 'home',
	pathMatch: 'full'
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
