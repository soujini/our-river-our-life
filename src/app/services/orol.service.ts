import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Route, Router, NavigationStart, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SpinnerService } from '../services/spinner.service';
declare var Orol: any;
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrolService {
  public userDetailsSubject = new BehaviorSubject({});
  userDetails = this.userDetailsSubject.asObservable();
  constructor(private router: Router, public httpClient: HttpClient, private spinnerService: SpinnerService) { }

  
  public createWaterTestDetails(x, imageFilesRiver: File[], imageFilesSurrounding: File[], imageFilesFlora: File[], imageFilesFauna: File[], imageFilesGroup: File[], imageFilesActivity: File[], imageFilesAtwork: File[]) {
    // this.spinnerService.setSpinner(true);
    var user = JSON.parse(localStorage.getItem('User'));
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + user.accessToken
    });
    const form = new FormData;
    for (var i = 0; i < imageFilesRiver.length; i++) {
      form.append('river', imageFilesRiver[i]);
    }
    for (var i = 0; i < imageFilesFlora.length; i++) {
      form.append('flora', imageFilesFlora[i]);
    }
    for (var i = 0; i < imageFilesFauna.length; i++) {
      form.append('fauna', imageFilesFauna[i]);
    }
    for (var i = 0; i < imageFilesGroup.length; i++) {
      form.append('groupPicture', imageFilesGroup[i]);
    }
    for (var i = 0; i < imageFilesActivity.length; i++) {
      form.append('activity', imageFilesActivity[i]);
    }
    for (var i = 0; i < imageFilesAtwork.length; i++) {
      form.append('artwork', imageFilesAtwork[i]);
    }
    form.append("userId", user.id);
    form.append("generalInformation[activityDate]", x.generalInformation.activityDate);
    form.append("generalInformation[activityTime]", x.generalInformation.activityTime);
    form.append("generalInformation[testerName]", x.generalInformation.testerName);
    form.append("generalInformation[latitude]", x.generalInformation.latitude);
    form.append("generalInformation[longitude]", x.generalInformation.longitude);
    form.append("generalInformation[location]", x.generalInformation.location);
    form.append("waterLevelAndWeather[airTemperature]", x.waterLevelAndWeather.airTemperature);
    form.append("waterLevelAndWeather[waterLevel]", x.waterLevelAndWeather.waterLevel);
    form.append("waterLevelAndWeather[weather]", x.waterLevelAndWeather.weather);
    form.append("surroundings", x.surroundings);
    form.append("waterTesting[waterTemperature]", x.waterTesting.waterTemperature);
    form.append("waterTesting[pH]", x.waterTesting.pH);
    form.append("waterTesting[dissolvedOxygen]", x.waterTesting.dissolvedOxygen);
    form.append("waterTesting[hardness]", x.waterTesting.hardness);
    form.append("waterTesting[nitrate]", x.waterTesting.nitrate);
    form.append("waterTesting[nitrite]", x.waterTesting.nitrite);
    form.append("waterTesting[chlorine]", x.waterTesting.chlorine);
    form.append("waterTesting[alkalinity]", x.waterTesting.alkalinity);
    form.append("waterTesting[iron]", x.waterTesting.iron);
    form.append("waterTesting[bacteria]", x.waterTesting.bacteria);
    form.append("waterTesting[turbidity]", x.waterTesting.turbidity);
    form.append("waterTesting[phosphate]", x.waterTesting.phosphate);
    form.append("waterTesting[ammonia]", x.waterTesting.ammonia);
    form.append("waterTesting[lead]", x.waterTesting.lead);
    form.append("waterTesting[dissolvedSolids]", x.waterTesting.dissolvedSolids);
    form.append("waterTesting[conductivity]", x.waterTesting.conductivity);
    form.append("flora", x.flora);
    form.append("fauna", x.fauna);
    form.append("artwork", x.artwork);
    form.append("groupPicture", x.groupPicture);
    form.append("activity", x.activity);
    form.append("river", x.river);
    // form.append("certificateURL", x.certificateURL);
    console.log(form);
    return this.httpClient.post("https://our-river-our-life-api.herokuapp.com/water-test-details/create-web", form, { headers: httpHeaders });


    // this.httpClient.post("https://our-river-our-life-api.herokuapp.com/flood-alert/create-alert", form).subscribe(
    //   (res) => {
    //     this.spinnerService.setSpinner(false);
    //     this.router.navigate(['./home']);

    //   },
    //   (err) => {
    //     this.spinnerService.setSpinner(false);
    //     window.alert(err)
    //   },
    // );
  }
  public generateReport(x) {
    var user = JSON.parse(localStorage.getItem('User'));
    this.spinnerService.setSpinner(true);
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + user.accessToken
    });
    // const form = new FormData;
    // form.append("userId", x.userId);
    // form.append("location", x.location);


    return this.httpClient.post("https://our-river-our-life-api.herokuapp.com/pdf/generateReportWeb", x, { headers: httpHeaders });
    // .subscribe(
    //   (res) => {
    //     this.spinnerService.setSpinner(false);
    //     // this.router.navigate(['./home']);
    //
    //   },
    //   (err) => {
    //     this.spinnerService.setSpinner(false);
    //     window.alert(err)
    //   },
    // );
  }
  public getAccessToken(username, mode) { //Username can be email or phone number
    var obj;
    if (mode == "phone") {
      obj = {
        "phoneNumber": username
      };
    }
    else {//email
      obj = {
        "email": username
      };
    }
    this.spinnerService.setSpinner(true);
    return this.httpClient.post("https://our-river-our-life-api.herokuapp.com/user/auth", obj);
  }
  public signInPhone(phone) {
    this.spinnerService.setSpinner(true);
    var obj = {
      "phoneNumber": phone
    };
    return this.httpClient.post("https://our-river-our-life-api.herokuapp.com/user/sign-in", obj);
  }
  public signInWeb(email, phone, firstName, lastName) {//create user in the user table
    this.spinnerService.setSpinner(true);
    var obj = {
      "email": email,
      "phoneNumber": phone,
      "firstName": firstName,
      "lastName": lastName
    };
    return this.httpClient.post("https://our-river-our-life-api.herokuapp.com/user/sign-in-web", obj)
      .toPromise()
      .then((res) => {
        // this.user = res;
        console.log(res);
      })
      .catch(err => { console.log("Oops! Sign In Web " + err) });
  }

  public addAlert(x, images: File[]) {
    this.spinnerService.setSpinner(true);
    const form = new FormData;
    for (var i = 0; i < images.length; i++) {
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

  public addFlora(x, images: File[]) {
    var user = JSON.parse(localStorage.getItem('User'));

    this.spinnerService.setSpinner(true);
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + user.accessToken
    });
    const form = new FormData;
    for (var i = 0; i < images.length; i++) {
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

  public addFauna(x, images: File[]) {
    var user = JSON.parse(localStorage.getItem('User'));
    this.spinnerService.setSpinner(true);
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + user.accessToken
    });
    const form = new FormData;
    for (var i = 0; i < images.length; i++) {
      form.append('fauna', images[i]);
    }

    form.append("userId", x.userId);
    form.append("location", x.location);
    form.append("latitude", x.latitude);
    form.append("longitude", x.longitude);
    form.append("commonName", x.commonName);
    form.append("localName", x.localName);
    form.append("scientificName", x.scientificName);

    this.httpClient.post("https://our-river-our-life-api.herokuapp.com/flora-fauna/create-fauna", form, { headers: httpHeaders }).subscribe(
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

  public getFloodAlerts() {
    this.spinnerService.setSpinner(true);
    return this.httpClient.get("https://our-river-our-life-api.herokuapp.com/flood-alert");
  }
  public getWaterTestDetails() {
    var user = JSON.parse(localStorage.getItem('User'));
    this.spinnerService.setSpinner(true);
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + user.accessToken
    });
    return this.httpClient.get("https://our-river-our-life-api.herokuapp.com/water-test-details", { headers: httpHeaders });
  }
  public getFloraFauna() {
    var user = JSON.parse(localStorage.getItem('User'));
    // this.spinnerService.setSpinner(true);
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + user.accessToken
    });
    return this.httpClient.get("https://our-river-our-life-api.herokuapp.com/flora-fauna", { headers: httpHeaders });
  }

  public getUser() {
    var user = JSON.parse(localStorage.getItem('User'));
    this.spinnerService.setSpinner(true);
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + user.accessToken
    });
    return this.httpClient.get("https://our-river-our-life-api.herokuapp.com/user/" + user.id, { headers: httpHeaders });
  }

  public updateUser(userObj) {
    var user = JSON.parse(localStorage.getItem('User'));
    this.spinnerService.setSpinner(true);
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + user.accessToken
    });
    return this.httpClient.put("https://our-river-our-life-api.herokuapp.com/user/" + user.id, userObj, { headers: httpHeaders });
  }


  public updateProfile(userInfo, images: File[]) {
    var user = JSON.parse(localStorage.getItem('User'));
    this.spinnerService.setSpinner(true);
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer '+user.accessToken
    });
    const form = new FormData;
    for (var i = 0; i < images.length; i++) {
      form.append('avatar', images[i]);
    }
    form.append("id", userInfo.id);
    form.append("firstName", userInfo.firstName);
    form.append("lastName", userInfo.lastName);
    form.append("email", userInfo.email);
    form.append("phoneNumber", userInfo.phoneNumber);
    form.append("avatarURL", userInfo.avatarURL);


    this.httpClient.post("https://our-river-our-life-api.herokuapp.com/user/update-profile", form, { headers: httpHeaders }).subscribe(
      (res) => {
        console.log(res);
        this.spinnerService.setSpinner(false);
        this.router.navigate(['./edit-profile']);
        localStorage.removeItem('User');
        localStorage.setItem('User', JSON.stringify(res));
        this.userDetailsSubject.next(res);

      },
      (err) => {
        this.spinnerService.setSpinner(false);
        window.alert(err)
      },
    );
  }


  public errorHandler(error: any) {
    if (error) {
      if (error == 'Error: Session expired') { //401 Unauthorized
        Orol.login();
        //emit login page
      }
      else if (error.status == 404) {
        this.router.navigate(['/', '404']);
      }
      else if (error.status == 500) {
        this.router.navigate(['/', '500']);
      }
    }
  }
}
