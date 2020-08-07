import { Component, OnInit, AfterViewInit, AfterViewChecked, Output, EventEmitter , ViewChildren, QueryList} from '@angular/core';
import { MDBBootstrapModulesPro, CarouselModule, WavesModule} from 'ng-uikit-pro-standard';
import { forkJoin } from 'rxjs';
import { ImgLoadedDirective } from '../../directives/directive.directive';
// import { BannerComponent } from '../../components/banner/banner.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  @ViewChildren(ImgLoadedDirective) images: QueryList<ImgLoadedDirective>;
isLoading: boolean = true;
// images:any=[
//   '../../assets/scalable-vector-graphics/orol-logo.svg'
// ];

  constructor() { }

   ngOnInit() {

   }
     ngAfterViewInit() {
     //   forkJoin(this.images.map(imgDir => imgDir.loaded)).subscribe(() => {
     //     console.log('all images have been loaded');
     //   });
      }


}
