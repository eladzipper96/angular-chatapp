import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import {io} from 'socket.io-client'

import { environment } from 'src/environments/environment';
import { UserDataService } from "../store/UserData.service";

@Injectable({
    providedIn: 'root'
  })
export class ControlSocketService {

    controlSocket$: BehaviorSubject<any> = new BehaviorSubject<any>('')

    constructor(private UserDataService:UserDataService) {
        this.UserDataService.getUserId().subscribe(id => 
        this.controlSocket$.next(io(`${environment.API_URL}`, {query: {'chatid': id}})))
    }

    getSocket() {
        return this.controlSocket$.asObservable()
    }

    createNewSocket(roomid: string) {
        return io(`${environment.API_URL}`, {query: {'chatid': roomid}})
    }

    emit(eventName: string, data: any) {
        this.controlSocket$.getValue().emit(eventName,{...data, year:'2022'})
    }


}