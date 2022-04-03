import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'

import { AuthService } from './auth.service';
import { UserDataService } from './userdata.service';

import {user} from '../interfaces/user.interface'

import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
export class AuthGuard implements CanActivate {

    constructor(
        private authService:AuthService,
        private router:Router,
        private UserDataService: UserDataService,
        private HttpClient: HttpClient) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        let return_val: boolean = false;

        this.authService.isLoggedIn().subscribe(loggedIn => {
            if(loggedIn) {
                return_val = true
            }
            else {
                const sessionCookie = this.getCookie('sessionid')
                if(sessionCookie) {
                    this.authService.setinLoginProcess(true)
                    this.HttpClient.get(`${environment.API_URL}/cookiecheck`, {withCredentials: true})
                    .subscribe(value => {
                        // Case Session Cookie is Invalid
                        if('result' in value) {
                            return_val = this.rejectHandler()
                        }
                        // Case Session Cookie is Valid
                        else {
                            this.UserDataService.SetAllUserData(value as user[])
                            this.authService.setinLoginProcess(false)
                        }
                    })
                    return_val = true
                }
                else {
                    return_val = this.rejectHandler()
                }
            }
        })
        
        return return_val
    }

    getCookie(name: any) {
        const value = `; ${document.cookie}`;
        const parts: any = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    rejectHandler(): boolean {
        this.router.navigate(['/login'])
        this.authService.setinLoginProcess(false)
        return false
    }
}