import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DomUiService {

    showAddFriend$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
    showNotifcations$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

    getShowAddFriend() {
        return this.showAddFriend$.asObservable()
    }

    getShowNotifcations() {
        return this.showNotifcations$.asObservable()
    }

    setShowAddFriend(value: boolean) {
        this.showAddFriend$.next(value)
    }

    setShowNotifcations(value: boolean) {
        this.showNotifcations$.next(value)
    }
}