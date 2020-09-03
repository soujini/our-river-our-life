// import { Component, OnInit } from '@angular/core';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-ongoing-campaigns',
  templateUrl: './ongoing-campaigns.component.html',
  styleUrls: ['./ongoing-campaigns.component.scss']
})
export class OngoingCampaignsComponent implements OnInit {
  @ViewChild('widgetsContent') widgetsContent: ElementRef;
  safeSrc: SafeResourceUrl;


  campaigns_list: any = [
    {
      name: 'Hubbali Ankola Railway Line',
      defaultVideo:this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/bvI8pBdfPYQ"),
      campaigns: [
        {
          name: 'Hubballi-Ankola rail line: Why are environmentalists against it?',
          url: 'https://www.conservationindia.org/campaigns/reject-the-hubballi-ankola-railway-line-project-harp-in-uttara-kannada-act-now',
        }
      ],
      videos: [
        {
          name: 'Hubbali Ankola Railway Line',
          url: 'https://www.youtube.com/embed/bvI8pBdfPYQ',
          thumb:'https://img.youtube.com/vi/bvI8pBdfPYQ/0.jpg'
        }
      ],
    },
    {
      name: 'Environment Impact Assessment',
      defaultVideo:this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/4S1IvA_aDgI"),
      campaigns: [
        {
          name: 'Environment Impact Assessment 2020',
          url: 'https://unitedconservationmovement.org/eia2020-draft-response/',
        }
      ],
      videos: [
        {
          name: 'Understanding EIA concerns: How does the new draft EIA affect the environment and us?',
          url: 'https://www.youtube.com/embed/4S1IvA_aDgI' ,
          thumb:'https://img.youtube.com/vi/bvI8pBdfPYQ/0.jpg'
        },
        {
          name: 'How does the new draft EIA affect the environment and us?',
          url: 'https://www.youtube.com/embed/vzqH4MsrOAQ' ,
          thumb:'https://img.youtube.com/vi/bvI8pBdfPYQ/0.jpg'
        }
      ],
    },

    {
      name: 'Dibang Valley Hydropower Project',
      defaultVideo:this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/1jwwvQX1T6s"),
      campaigns: [
        {
          name: 'Dibang Valley Hydropower Project',
          url: 'https://www.change.org/p/chief-justice-of-india-stop-hydropower-project-in-arunachal-s-bio-diverse-dibang-valley',
        },
        {
          name: 'Dibang Valley Hydropower Project',
          url: 'https://www.conservationindia.org/campaigns/save-the-destruction-of-dibang-valley',
        }
      ],
      videos: [
        {
          name: 'Dibang Valley, not a dam country',
          url: 'https://www.youtube.com/embed/1jwwvQX1T6s' ,
          thumb:'https://img.youtube.com/vi/bvI8pBdfPYQ/0.jpg'
        },
        {
          name: 'How big do you think 11.5 sq kms is?',
          url: 'https://www.youtube.com/embed/LV8lY0Yj4sA' ,
          thumb:'https://img.youtube.com/vi/bvI8pBdfPYQ/0.jpg'
        },
        {
          name: 'Voices of Dibang Resistance',
          url: 'https://www.youtube.com/embed/ow3ZdbhT2vs' ,
          thumb:'https://img.youtube.com/vi/bvI8pBdfPYQ/0.jpg'
        },
        {
          name: 'Dibang Valley Resistance',
          url: 'https://www.youtube.com/embed/6aX9YS5e7x8' ,
          thumb:'https://img.youtube.com/vi/bvI8pBdfPYQ/0.jpg'
        },
        {
          name: 'Voices of the Youth',
          url: 'https://www.youtube.com/embed/4ujI8T22fdc' ,
          thumb:'https://img.youtube.com/vi/bvI8pBdfPYQ/0.jpg'
        },
      ],
    },


  ]

  constructor(private sanitizer: DomSanitizer) {
    // this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/oVXmpxZkoTQ");
  }

  ngOnInit(): void {
  }


  scrollUp(){
    this.widgetsContent.nativeElement.scrollUp -= 150;
  }

  scrollDown(){
    this.widgetsContent.nativeElement.scrollUp += 150;
  }

}
