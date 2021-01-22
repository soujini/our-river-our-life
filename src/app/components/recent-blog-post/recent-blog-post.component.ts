import { Component, OnInit } from '@angular/core';
import { OrolService } from '../../services/orol.service';

@Component({
  selector: 'app-recent-blog-post',
  templateUrl: './recent-blog-post.component.html',
  styleUrls: ['./recent-blog-post.component.scss']
})
export class RecentBlogPostComponent implements OnInit {

    // cards = [
    //   // {
    //   //   title: 'News 1',
    //   //   img: 'https://mdbootstrap.com/img/Photos/Others/images/52.jpg'
    //   // },
    //   // {
    //   //   title: 'News 2',
    //   //   img: 'https://mdbootstrap.com/img/Photos/Others/images/52.jpg'
    //   // },
    //   // {
    //   //   title: 'Major Rivers in India',
    //   //   img: 'https://mdbootstrap.com/img/Photos/Others/images/52.jpg'
    //   // },
    //   // {
    //   //   title: 'Conserve Water',
    //   //   img: 'https://mdbootstrap.com/img/Photos/Others/images/52.jpg'
    //   // },

    //   // {
    //   //   title: 'News 3',
    //   //   img: 'https://mdbootstrap.com/img/Photos/Others/images/52.jpg'
    //   // },

    //   // {
    //   //   title: 'News 4',
    //   //   img: 'https://mdbootstrap.com/img/Photos/Others/images/52.jpg'
    //   // },

    //   // {
    //   //   title: 'News 5',
    //   //   img: 'https://mdbootstrap.com/img/Photos/Others/images/52.jpg'
    //   // },

    //   // {
    //   //   title: 'News 6',
    //   //   img: 'https://mdbootstrap.com/img/Photos/Others/images/52.jpg'
    //   // },
    //   // {
    //   //   title: 'News 7',
    //   //   img: 'https://mdbootstrap.com/img/Photos/Others/images/52.jpg'
    //   // },

    // ];
    slides: any = [[]];
    cards = [];

    constructor( private orolService: OrolService,) {
      this.getRecentBlogs();

    }

    ngOnInit() {
      
    }
    chunk(arr, chunkSize) {
      let R = [];
      for (let i = 0, len = arr.length; i < len; i += chunkSize) {
        R.push(arr.slice(i, i + chunkSize));
      }
      return R;
    }
    getRecentBlogs() {
      this.orolService.getRecentBlogs().subscribe((data) => {
        if (data['count']) {
          for (var i = 0; i < data['rows'].length; i++) {
            this.cards.push({
              featuredTitle: data['rows'][i].featuredTitle,
              featuredPhoto: data['rows'][i].featuredPhoto,
              createdAt: data['rows'][i].createdAt,
              contributorName: data['rows'][i].contributorName,
              
            });
          }
          this.slides = this.chunk(this.cards, 3);
        }
        // this.spinnerService.setSpinner(false);
      });
    }
  }
