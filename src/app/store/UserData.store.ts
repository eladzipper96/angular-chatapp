import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

import { contact } from 'src/interfaces/contact.interface';
import { notifications } from 'src/interfaces/notifications.interface';
import { chat } from 'src/interfaces/chat.interface';

export interface UserDataState {
    activechats: string[];
    chats: chat[];
    contacts: contact[],
    blocked: string[],
    notifications: notifications[],
    id: string,
    username: string,
    updatedAt: string,
    email: string,
    birthday: string,
    name: string,
    last_name: string,
    phone: string,
    profile_picture: string,
    website: string,
    moto: string,
    address: string,
    facebook: string,
    instagram: string,
    linkedin: string,
    twitter: string
}

export function createInitialState(): UserDataState {
  return {
    activechats: [],
    chats: [],
    contacts: [],
    blocked: [],
    notifications: [],
    id: '',
    updatedAt: '',
    username: '',
    email: '',
    birthday: '',
    name: '',
    last_name: '',
    phone: '',
    profile_picture: '',
    website: '',
    moto: '',
    address: '',
    facebook: '',
    instagram: '',
    linkedin: '',
    twitter: ''
  };
}

@Injectable({
    providedIn: 'root'
})
@StoreConfig({ name: 'userData' })
export class UserDataStore extends Store<UserDataState> {
  constructor() {
    super(createInitialState());
  }
}