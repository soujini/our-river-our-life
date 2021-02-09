import { Component, OnInit } from '@angular/core';
import { OrolService } from '../../services/orol.service';
import { butterService } from '../../services';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-recent-blog-post',
  templateUrl: './recent-blog-post.component.html',
  styleUrls: ['./recent-blog-post.component.scss']
})
export class RecentBlogPostComponent implements OnInit {
  posts:any;

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

    constructor( private orolService: OrolService, private spinnerService: SpinnerService) {
      this.getPostsFromButterCMS();

    }
    getPostsFromButterCMS(){
      this.spinnerService.setSpinner(true);
      butterService.post.list({
        page: 1,
        page_size: 10
      }).then((res) => {
        this.posts = res.data.data;
        for (var i = 0; i < this.posts.length; i++) {
          console.log(this.posts[i].featured_image);
          this.cards.push({
            featuredTitle: this.posts[i].title,
            featuredPhoto: this.posts[i].featured_image,
            updated: this.posts[i].updated,
            contributorName: this.posts[i].author.first_name + " " + this.posts[i].author.last_name

          });
        }
        this.slides = this.chunk(this.cards, 4);
      });
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
          this.slides = this.chunk(this.cards, 4);
        }
        // this.spinnerService.setSpinner(false);
      });
    }
  }
