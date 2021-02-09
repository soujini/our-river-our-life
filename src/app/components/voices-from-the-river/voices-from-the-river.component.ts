import { Component, OnInit } from '@angular/core';
import { butterService } from '../../services';
import { SpinnerService } from '../../services/spinner.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-voices-from-the-river',
    templateUrl: './voices-from-the-river.component.html',
    styleUrls: ['./voices-from-the-river.component.scss']
})
export class VoicesFromTheRiverComponent implements OnInit {
    public posts: any[];
    pageNumber = 1;

    constructor(private spinnerService: SpinnerService, private router: Router,) {
    }

    ngOnInit() {
        butterService.post.list({
            page: 1,
            page_size: 10
        }).then((res) => {
            this.posts = res.data.data;
        });
        this.spinnerService.setSpinner(true);

    }
    onScroll() {
        this.pageNumber = this.pageNumber + 1;
    }

}
