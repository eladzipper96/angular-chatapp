import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

import { contact } from 'src/interfaces/contact.interface';
import { ContactsStore } from './contacts.store';

@Injectable()
export class ContactsService {

    constructor(private ContactsStore: ContactsStore) {}

    // selectedContact$: BehaviorSubject<contact | boolean> = new BehaviorSubject<contact | boolean>(false)

    // getSelectedContact() {
    //     return this.selectedContact$.asObservable()
    // }

    setSelectedContact(contact: contact) {
        this.ContactsStore.update(state => ({
            ...state,
            selectedContact: contact
        }))
    }

}