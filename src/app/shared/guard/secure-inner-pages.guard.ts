import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router  } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "../../shared/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class SecureInnerPagesGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authService.isLoggedIn) {
      window.alert("You are not allowed to access this URL!");
<<<<<<< Updated upstream
       this.router.navigate(['Home'])
=======
       // this.router.navigate(['dashboard'])
>>>>>>> Stashed changes
    }
    return true;
  }

}
