import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Route, Router, NavigationStart, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SpinnerService } from '../services/spinner.service';
declare var Orol:any;



@Injectable({
  providedIn: 'root'
})
export class OrolService {
  constructor( private router: Router, public httpClient: HttpClient,  private spinnerService: SpinnerService) { }

  public getAccessToken(phone){
    var obj = {
      "phoneNumber":phone
    };
    this.spinnerService.setSpinner(true);
    return this.httpClient.post("https://our-river-our-life-api.herokuapp.com/user/auth", obj);
  }
  public signIn(email, phone){
    this.spinnerService.setSpinner(true);
    var obj = {
      "email":email,
      "phoneNumber":phone
    };
    return this.httpClient.post("https://our-river-our-life-api.herokuapp.com/user/sign-in-web", obj);
  }

  public addAlert(x, images:File[]){
    this.spinnerService.setSpinner(true);
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

    this.httpClient.post("https://our-river-our-life-api.herokuapp.com/flood-alert/create-alert", form).subscribe(
      (res) => {
        this.spinnerService.setSpinner(false);
        this.router.navigate(['./home']);

      },
      (err) => {
        this.spinnerService.setSpinner(false);
        window.alert(err)
      },
    );
  }

  public addFloraFauna(x, images:File[]){
    // this.spinnerService.setSpinner(true);
    // const form = new FormData;
    // for(var i=0; i<images.length;i++){
    //   form.append('photos', images[i]);
    // }
    //
    // form.append("location", x.location);
    // form.append("latitude", x.latitude);
    // form.append("longitude", x.longitude);
    // form.append("activityDate", x.activityDate);
    // form.append("activityTime", x.activityTime);
    // form.append("experience", x.experience);
    //
    // this.httpClient.post("https://our-river-our-life-api.herokuapp.com/flood-alert/create-alert", form).subscribe(
    //   (res) => {
    //     this.spinnerService.setSpinner(false);
    //     this.router.navigate(['./home']);
    //
    //   },
    //   (err) => {
    //     this.spinnerService.setSpinner(false);
    //     window.alert(err)
    //   },
    // );
  }

  public getFloodAlerts(){
    this.spinnerService.setSpinner(true);
    return this.httpClient.get("https://our-river-our-life-api.herokuapp.com/flood-alert");

  }
  public getWaterTestDetails(){
    this.spinnerService.setSpinner(true);
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Ijk5NDk1MDk5MzMiLCJpYXQiOjE1OTI5MDY4NDZ9.lNFKWIF-laGYTbrBgdAzcuZpvSI8TsRinwQCV8ZWZcI'
    });
    return this.httpClient.get("https://our-river-our-life-api.herokuapp.com/water-test-details", { headers: httpHeaders });
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
