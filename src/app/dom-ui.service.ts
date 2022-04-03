import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DomUiService {

    showAddFriend: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
    showNotifcations: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

    
}