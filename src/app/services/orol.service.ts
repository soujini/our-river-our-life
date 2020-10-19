import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Route, Router, NavigationStart, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SpinnerService } from '../services/spinner.service';
declare var Orol:any;
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrolService {
  public userDetailsSubject = new BehaviorSubject({});
  userDetails = this.userDetailsSubject.asObservable();
  constructor( private router: Router, public httpClient: HttpClient,  private spinnerService: SpinnerService) { }

  public getAccessToken(username, mode){ //Username can be email or phone number
    var obj;
    if(mode == "phone"){
      obj = {
        "phoneNumber":username
      };
    }
    else{//email
      obj = {
        "email":username
      };
    }
    this.spinnerService.setSpinner(true);
    return this.httpClient.post("https://our-river-our-life-api.herokuapp.com/user/auth", obj);
  }
  public signInPhone(phone){
    this.spinnerService.setSpinner(true);
    var obj = {
      "phoneNumber":phone
    };
    return this.httpClient.post("https://our-river-our-life-api.herokuapp.com/user/sign-in", obj);
  }
  public signInWeb(email, phone, firstName, lastName){//create user in the user table
    this.spinnerService.setSpinner(true);
    var obj = {
      "email":email,
      "phoneNumber":phone,
      "firstName":firstName,
      "lastName":lastName
    };
    return this.httpClient.post("https://our-river-our-life-api.herokuapp.com/user/sign-in-web", obj)
    .toPromise()
    .then((res) => {
      // this.user = res;
      console.log(res);
    })
    .catch(err=> { console.log("Oops! Sign In Web "+ err) });
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

  public addFlora(x, images:File[]){
    var user = JSON.parse(localStorage.getItem('User'));

    this.spinnerService.setSpinner(true);
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer '+user.accessToken
    });
    const form = new FormData;
    for(var i=0; i<images.length;i++){
      form.append('flora', images[i]);
    }

    form.append("userId", x.userId);
    form.append("location", x.location);
    form.append("latitude", x.latitude);
    form.append("longitude", x.longitude);
    form.append("commonName", x.commonName);
    form.append("localName", x.localName);
    form.append("scientificName", x.scientificName);

    this.httpClient.post("https://our-river-our-life-api.herokuapp.com/flora-fauna/create-flora", form, { headers: httpHeaders }).subscribe(
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

  public addFauna(x, images:File[]){
    var user = JSON.parse(localStorage.getItem('User'));
    this.spinnerService.setSpinner(true);
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer '+user.accessToken
    });
    const form = new FormData;
    for(var i=0; i<images.length;i++){
      form.append('fauna', images[i]);
    }

    form.append("userId", x.userId);
    form.append("location", x.location);
    form.append("latitude", x.latitude);
    form.append("longitude", x.longitude);
    form.append("commonName", x.commonName);
    form.append("localName", x.localName);
    form.append("scientificName", x.scientificName);

    this.httpClient.post("https://our-river-our-life-api.herokuapp.com/flora-fauna/create-fauna", form,{ headers: httpHeaders }).subscribe(
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

  public getFloodAlerts(){
    this.spinnerService.setSpinner(true);
    return this.httpClient.get("https://our-river-our-life-api.herokuapp.com/flood-alert");
  }
  public getWaterTestDetails(){
    var user = JSON.parse(localStorage.getItem('User'));
    this.spinnerService.setSpinner(true);
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer '+user.accessToken
    });
    return this.httpClient.get("https://our-river-our-life-api.herokuapp.com/water-test-details", { headers: httpHeaders });
  }
  public getFloraFauna(){
    var user = JSON.parse(localStorage.getItem('User'));
    this.spinnerService.setSpinner(true);
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer '+user.accessToken
    });
    return this.httpClient.get("https://our-river-our-life-api.herokuapp.com/flora-fauna", { headers: httpHeaders });
  }

  public getUser(id){
    var user = JSON.parse(localStorage.getItem('User'));
    this.spinnerService.setSpinner(true);
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer '+user.accessToken
    });
    return this.httpClient.get("https://our-river-our-life-api.herokuapp.com/user/"+user.id, { headers: httpHeaders });
  }

  public updateUser(){
    var user = JSON.parse(localStorage.getItem('User'));
    this.spinnerService.setSpinner(true);
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer '+user.accessToken
    });
    return this.httpClient.put("https://our-river-our-life-api.herokuapp.com/user/"+user.id, { headers: httpHeaders });
  }

  public errorHandler(error:any){
    if(error){
      if (error == 'Error: Session expired'){ //401 Unauthorized
        Orol.login();
        //emit login page
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
