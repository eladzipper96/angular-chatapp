import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
  })
export class LoginGuard implements CanActivate {

    constructor(private authService:AuthService, private router:Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

        this.authService.isLoggedIn().subscribe(value => {
            if(value) {
                this.router.navigate(['/'])
                return false
            }

            return true
        })
        return true   
    }
}