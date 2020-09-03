import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Route, Router, NavigationStart, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SpinnerService } from '../services/spinner.service';
declare var Orol:any;



@Injectable({
  providedIn: 'root'
})
export class OrolService {
  constructor( private router: Router, public httpClient: HttpClient,private spinnerService: SpinnerService) { }

  public addAlert(x, images:File[]){

    const form = new FormData;
    for(var i=0; i<images.length;i++){
      form.append('photos', images[i]);
    }

    form.append("location", x.location);
    form.append("latitude", x.latitude);
    form.append("longitude", x.longitude);
    form.append("activityDate", x.activityDate);
    form.append("activityTime", x.activityTime);
    form.append("experience", x.experience);

    // this.httpClient.post("https://our-river-our-life-api.herokuapp.com/flood-alert/create-alert", form).subscribe(
    //   (res) => {
    //     console.log(res);
    //   },
    //   (err) => {
    //     console.log(err)
    //   },
    //   alert("done2"),
    // );
    //   this.spinnerService.setSpinner(false);
    //   alert("done");

      this.httpClient.post("https://our-river-our-life-api.herokuapp.com/flood-alert/create-alert", form).subscribe((res) => {
        this.spinnerService.setSpinner(false);
      });
    }

    public getFloodAlerts(){
      this.spinnerService.setSpinner(true);
      return this.httpClient.get("https://our-river-our-life-api.herokuapp.com/flood-alert");
    }

    public errorHandler(error:any){
      if(error){
        if (error == 'Error: Session expired'){ //401 Unauthorized
          Orol.login();
        }
        else if (error.status == 404){
          this.router.navigate(['/', '404']);
        }
        else if (error.status == 500){
          this.router.navigate(['/', '500']);
        }
      }
    }
  }
