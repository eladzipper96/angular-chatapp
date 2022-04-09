import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

import { contact } from 'src/interfaces/contact.interface';
import { ContactsQuery } from './contacts.query';
import { ContactsStore } from './contacts.store';

@Injectable()
export class ContactsService {

    constructor(private ContactsStore: ContactsStore, private ContactsQuery:ContactsQuery) {}

    getSelectedContact() {
        return this.ContactsQuery.selectContact$
    }

    setSelectedContact(contact: contact) {
        this.ContactsStore.update(state => ({
            ...state,
            selectedContact: contact
        }))
    }

}