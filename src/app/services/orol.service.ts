import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Route, Router, NavigationStart, ActivatedRoute } from '@angular/router';

// import { SpinnerService } from '../services/spinner.service';
declare var Orol:any;



@Injectable({
  providedIn: 'root'
})
export class OrolService {
  private baseURL: string = environment.OROL_API_URL;

  constructor( private router: Router) { }
  public addAlert():any {
    // this.spinnerService.setSpinner(true); 
    const url= this.baseURL+"flood-alert/create-alert"
    return Orol.api(
      {
        "url": url,
        "method": "POST",
        
      }).then(
        data => {
          // this.spinnerService.setSpinner(false);
          return data;
        },
        error => {
          // this.spinnerService.setSpinner(false);
          if(error.response){
          console.log('Error - Add Alert', error.response["error"]["message"]);
        }
        this.errorHandler(error);
          return error;
        });
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
