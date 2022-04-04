import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  LoginProcess$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  showOnEntrance$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn$.asObservable()
  }

  setIsLoggedIn(value: boolean) {
    this.loggedIn$.next(value)
  }

  inLoginProcess(): Observable<boolean> {
    return this.LoginProcess$.asObservable()
  }

  setinLoginProcess(value: boolean) {
    this.LoginProcess$.next(value)
  }

  getShowOnEntrance() {
    return this.showOnEntrance$.asObservable()
  }

  setShowOnEntrance(val: boolean) {
    this.showOnEntrance$.next(val)
  }

}
