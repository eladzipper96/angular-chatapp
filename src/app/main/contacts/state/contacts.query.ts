import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';
import { contact } from 'src/interfaces/contact.interface';
import { ContactsState, ContactsStore } from './contacts.store';

@Injectable()
export class ContactsQuery extends Query<ContactsState> {  

    selectContact$: Observable<contact | boolean> = this.select('selectedContact')

  constructor(protected override store: ContactsStore) {
    super(store);
  }
}