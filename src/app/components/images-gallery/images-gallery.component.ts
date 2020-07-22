import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-images-gallery',
  templateUrl: './images-gallery.component.html',
  styleUrls: ['./images-gallery.component.scss']
})
export class ImagesGalleryComponent implements OnInit {
  cards = [
    {
      // title: 'Card Title 1',
      // description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      // buttonText: 'Button',
      // img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
      artist: "Umeed Mistry",
       artist_profile_pic:"../../../assets/jpg/umeed_mistry.jpg",
       artist_social_media_1:"instagram.com/umeed.mistry/",
       artist_social_media_2:"@umeed.mistry",
       title:"Mahseer in a fish sanctuary, Karnataka.",
       description:"Glimpses of teeming native fish in our freshwater world are rare and only possible if we protect their habitat. Karnataka is blessed with 21 fish sanctuaries, accorded protection by the fisheries and forest department. Community fish sanctuaries additionally play a vital role in conservation of river habitats, and can go a long way in setting the trend for sustainable inland fisheries.",
       image:"../../../assets/jpg/gallery_1.jpg"
    },
    {
     
      artist: "Umeed Mistry",
      artist_profile_pic:"../../../assets/jpg/umeed_mistry.jpg",
      artist_social_media_1:"instagram.com/umeed.mistry/",
      artist_social_media_2:"@umeed.mistry",
      title:"From the forest floor, our rivers spring to life.",
      description:"The Western Ghats Global Biodiversity Hotspot, also known as the water tower for peninsular India, is where first- third order streams originate as a source for west and east flowing rivers. The dense forests and tropical montane grasslands act as a natural sponge for the monsoon rains, trapping and releasing a steady flow of water, which forms our life support system.",
      image:"../../../assets/jpg/gallery_2.jpg"
    },
    {
      artist: "Naren Sreenivasan",
      artist_profile_pic:"../../../assets/jpg/naren_srinivasan.jpg",
      artist_social_media_1:"",
      artist_social_media_2:"@wasiindia",
      title:"Cauvery Wildlife Sanctuary, Karnataka",
      description:"The river Cauvery, is the 8th largest river in India. Flowing from the Brahmagiri range in Kodagu district, the river is fed by 12 major tributaries, as it winds its way through Karnataka in a south- easterly direction and through Tamil Nadu, spanning a length of 805km, before reaching the Bay of Bengal.",
      image:"../../../assets/jpg/gallery_3.jpg"
    },
    {
      artist: "Dilan Mandanna",
      artist_profile_pic:"../../../assets/jpg/dilan_mandanna.jpg",
      artist_social_media_1:"www.dilanmandanna.com",
      artist_social_media_2:"",
      title:"Riverine communities and agroforestry",
      description:"Agroforestry practices have evolved over a long period of time, with the use of traditional knowledge to fulfill basic needs of farmers, such as food, medicine, fuelwood and cash income. However, socio- economic factors have led to a shift from traditional farming systems, with growing trends in commercial farming of non- native species such as silver oak and more recently, the introduction of palm oil. ",
      image:"../../../assets/jpg/gallery_4.jpg"
    },
    {
      artist: "Arati Kumar- Rao",
      artist_profile_pic:"../../../assets/jpg/arati_rao.jpg",
      artist_social_media_1:"www.peepli.org",
      artist_social_media_2:"",
      title:"Artisinal Hilsa fishermen, Sundarbans.",
      description:"“When we were young, we’d go out for an hour and come back with enough fish for a day. But now we go for eight hours, we fish deeper, fish farther out, and still come up with less than half the fish compared to my younger days” ~ Noor Miyan, 60  years old.Hilsa is their most lucrative catch. Hilsa makes their lives.Hilsa (Ilish mach) fisheries are facing an unprecedented crisis, with a catch return of one fish a day, in recent times.",
      image:"../../../assets/jpg/gallery_5.jpg"
    },
    {
      artist: "Arati Kumar- Rao",
      artist_profile_pic:"../../../assets/jpg/arati_rao.jpg",
      artist_social_media_1:"www.peepli.org",
      artist_social_media_2:"",
      title:"Lower floodplains of the Ganga",
      description:"The silt in the floodplains is as fertile as it gets, the claim across the basin is that vegetables grown on these silt- islands are the tastiest in the world. Silt transforms floodplains into food bowls. Silt makes deltas. Silt is the silent assuming hero of South Asia. And the Ganga is probably the siltiest river in the world, even more than the Amazon.",
      image:"../../../assets/jpg/gallery_6.jpg"
    },
    {
      artist: "Arati Kumar- Rao",
      artist_profile_pic:"../../../assets/jpg/arati_rao.jpg",
      artist_social_media_1:"www.aratikumarrao.com",
      artist_social_media_2:"",
      title:"Bamboo bridge over a tributary of the Siang",
      description:"River Siang, part of the Eastern Himalayan Global Biodiversity Hotspot, merges into the Brahmaputra in Assam. The region has been experiencing devastating floods each year, with excessive silting and river erosion along the floodplains in East- Siang district in Arunachal and further downstream in Assam. The key reason they state, is that an attempt to divert the river in its upper reaches led to massive landslides, affecting the downstream environment. ",
      image:"../../../assets/jpg/gallery_7.jpg"
    },
    {
      artist: "Roheen Browne Engti",
      artist_profile_pic:"../../../assets/jpg/roheen.jpg",
      artist_social_media_1:"",
      artist_social_media_2:"@north_by_northeast",
      title:"Dibang river, Arunachal Pradesh.",
      description:"The Dibang valley, part of the Eastern Himalayan Global Biodiversity Hotpot and home to the Idu Mishmi tribe, is in peril. The 3097 MW Etalin hydropower project proposed, is situated in a high seismic activity zone, and will result in felling of over 2.7 lakh trees, causing devastation to the biodiversity and Idu Mishmi people, whose lives are intertwined with the landscape.",
      image:"../../../assets/jpg/gallery_8.jpg"
    },
    {
      artist: "Roheen Browne Engti",
      artist_profile_pic:"../../../assets/jpg/roheen.jpg",
      artist_social_media_1:"",
      artist_social_media_2:"@north_by_northeast",
      title:"River Lohit, Arunachal Pradesh.",
      description:"The river Lohit has 7 main tributaries, with numerous other rivulets joining its course from the mountain slopes. Lohit exits the mountains forming braided channels, encapsulating the landscape as it flows down to meet Siang and Dibang- the confluence where they become one, forming the mighty Brahmaputra in Assam..",
      image:"../../../assets/jpg/gallery_9.jpg"
    },
    {
      artist: "Roheen Browne Engti",
      artist_profile_pic:"../../../assets/jpg/roheen.jpg",
      artist_social_media_1:"",
      artist_social_media_2:"@north_by_northeast",
      title:"Docked on a sandbar, engulfed in the vastness of Brahmaputra.",
      description:"The ever shifting course of the Brahmaputra forms sandbars called chaporis, which the river leaves unwittingly in its wake. These chaporis created between braided channels, can stretch for kilometres. Lives are inextricably linked to the whims of the river. People shift, just as the river does, to the next chapori they call their home.",
      image:"../../../assets/jpg/gallery_10.jpg"
    },
  ];
  slides: any = [[]];
  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }
  constructor() { }
  ngOnInit() {
    this.slides = this.chunk(this.cards, 1);
  }

}