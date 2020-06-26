import { Component, OnInit, ViewChild } from '@angular/core'
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps'

@Component({
  selector: 'app-flood-watch',
  templateUrl: './flood-watch.component.html',
  styleUrls: ['./flood-watch.component.scss']
})

  export class FloodWatchComponent implements OnInit {
    zoom = 12
    click(event: google.maps.MouseEvent) {
      console.log(event)
    }
    center: google.maps.LatLngLiteral
    options: google.maps.MapOptions = {
      mapTypeId: 'hybrid',
      zoomControl: false,
      scrollwheel: false,
      disableDoubleClickZoom: true,
      maxZoom: 15,
      minZoom: 8,
    }
  
    ngOnInit() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
      })
    }
  
    zoomIn() {
      if (this.zoom < this.options.maxZoom) this.zoom++
    }
  
    zoomOut() {
      if (this.zoom > this.options.minZoom) this.zoom--
    }
  }