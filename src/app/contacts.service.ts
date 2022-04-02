import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

import { contact } from 'src/interfaces/contact.interface';

@Injectable({
    providedIn: 'root'
})
export class ContactsService {

    selectedContact: BehaviorSubject<contact | boolean> = new BehaviorSubject<contact | boolean>(false)

    getSelectedContact() {
        return this.selectedContact.asObservable()
    }

    setSelectedContact(contact: contact) {
        this.selectedContact.next(contact)
    }

}