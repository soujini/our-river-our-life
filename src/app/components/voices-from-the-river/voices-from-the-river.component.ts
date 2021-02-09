import { Component, OnInit } from '@angular/core';
import { butterService } from '../../services';
import { SpinnerService } from '../../services/spinner.service';
import { Router } from '@angular/router';
import { OrolService } from '../../services/orol.service';

@Component({
  selector: 'app-voices-from-the-river',
  templateUrl: './voices-from-the-river.component.html',
  styleUrls: ['./voices-from-the-river.component.scss']
})
export class VoicesFromTheRiverComponent implements OnInit {
  public posts: any[];
  pageNumber = 1;
  user:any;

  constructor(private spinnerService: SpinnerService, private router: Router, private orolService:OrolService) {
    var user = JSON.parse(localStorage.getItem('User'));

    this.orolService.userDetailsSubject.subscribe(data => {
      if(JSON.stringify(data) === '{}'){
      }
      else{
        var user = JSON.parse(localStorage.getItem('User'));
        this.user=user;
      }
    });
  }

  ngOnInit() {
    this.getPostsFromButterCMS();
  }

  onScroll() {
    this.pageNumber = this.pageNumber + 1;
  }
  getPostsFromButterCMS(){
    this.spinnerService.setSpinner(true);
    butterService.post.list({
      page: 1,
      page_size: 10
    }).then((res) => {
      this.posts = res.data.data;
    });
  }
}
