import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrolService } from '../../services/orol.service';
import { SpinnerService } from '../../services/spinner.service';
@Component({
  selector: 'app-recent-post',
  templateUrl: './recent-post.component.html',
  styleUrls: ['./recent-post.component.scss']
})
export class RecentPostComponent implements OnInit {

  cards = [
    {
      title: 'Title of the news 1',
      img: '../../../assets/jpg/gallery_1.jpg'
    },
    {
      title: 'Title of the news 2',
      img: '../../../assets/jpg/gallery_1.jpg'
    },
    {
      title: 'Major Rivers in India 3',
      img: '../../../assets/jpg/gallery_3.jpg'
    },
    {
      title: 'Conserve Water 4',
      img: '../../../assets/jpg/gallery_8.jpg'
    },

    {
      title: 'Title of the news 5',
      img: '../../../assets/jpg/flora_fauna.jpg'
    },

    {
      title: 'Major Rivers in India 6',
      img: '../../../assets/jpg/gallery_3.jpg'
    },

    {
      title: 'Conserve Water 7',
      img: '../../../assets/jpg/gallery_8.jpg'
    },

    {
      title: 'Title of the news 8',
      img: '../../../assets/jpg/flora_fauna.jpg'
    },
    {
      title: 'Major Rivers in India 9',
      img: '../../../assets/jpg/gallery_3.jpg'
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
