import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DomUiService {

    showAddFriend$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
    showNotifications$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

    getShowAddFriend() {
        return this.showAddFriend$.asObservable()
    }

    getShowNotifications() {
        return this.showNotifications$.asObservable()
    }

    setShowAddFriend(value: boolean) {
        this.showAddFriend$.next(value)
    }

    setShowNotifications(value: boolean) {
        this.showNotifications$.next(value)
    }
}