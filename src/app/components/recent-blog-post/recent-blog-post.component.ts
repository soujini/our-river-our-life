import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recent-blog-post',
  templateUrl: './recent-blog-post.component.html',
  styleUrls: ['./recent-blog-post.component.scss']
})
export class RecentBlogPostComponent implements OnInit {

    cards = [
      {
        title: 'News 1',
        img: 'https://mdbootstrap.com/img/Photos/Others/images/52.jpg'
      },
      {
        title: 'News 2',
        img: 'https://mdbootstrap.com/img/Photos/Others/images/52.jpg'
      },
      {
        title: 'Major Rivers in India',
        img: 'https://mdbootstrap.com/img/Photos/Others/images/52.jpg'
      },
      {
        title: 'Conserve Water',
        img: 'https://mdbootstrap.com/img/Photos/Others/images/52.jpg'
      },

      {
        title: 'News 3',
        img: 'https://mdbootstrap.com/img/Photos/Others/images/52.jpg'
      },

      {
        title: 'News 4',
        img: 'https://mdbootstrap.com/img/Photos/Others/images/52.jpg'
      },

      {
        title: 'News 5',
        img: 'https://mdbootstrap.com/img/Photos/Others/images/52.jpg'
      },

      {
        title: 'News 6',
        img: 'https://mdbootstrap.com/img/Photos/Others/images/52.jpg'
      },
      {
        title: 'News 7',
        img: 'https://mdbootstrap.com/img/Photos/Others/images/52.jpg'
      },

    ];
    slides: any = [[]];

    constructor() {

    }

    ngOnInit() {
      this.slides = this.chunk(this.cards, 3);
    }
    chunk(arr, chunkSize) {
      let R = [];
      for (let i = 0, len = arr.length; i < len; i += chunkSize) {
        R.push(arr.slice(i, i + chunkSize));
      }
      return R;
    }
  }
