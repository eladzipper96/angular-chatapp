import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { contact } from 'src/interfaces/contact.interface';

export interface ContactsState {
    selectedContact: contact | boolean;
}

export function createInitialState(): ContactsState {
  return {
    selectedContact: false
  };
}
@Injectable()
@StoreConfig({ name: 'contacts' })
export class ContactsStore extends Store<ContactsState> {
  constructor() {
    super(createInitialState());
  }
}