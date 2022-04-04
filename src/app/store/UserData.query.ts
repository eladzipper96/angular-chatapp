import { Query } from '@datorama/akita';
import { UserDataState, UserDataStore } from './UserData.store';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { chat } from 'src/interfaces/chat.interface';
import { contact } from 'src/interfaces/contact.interface';
import { notifications } from 'src/interfaces/notifications.interface';


@Injectable({
    providedIn: 'root'
})
export class UserDataQuery extends Query<UserDataState> {  

    activechats$: Observable<string[]> = this.select('activechats')
    chats$: Observable<chat[]> = this.select('chats')
    contacts$: Observable<contact[]> = this.select('contacts')
    blocked$: Observable<string[]> =  this.select('blocked')
    notifications$: Observable<notifications[]> = this.select('notifications')

    id$: Observable<string> = this.select('id')
    updatedAt$: Observable<string> = this.select('updatedAt')
    email$: Observable<string> = this.select('email')
    birthday$: Observable<string> = this.select('birthday')
    name$: Observable<string> = this.select('name')
    last_name$: Observable<string> = this.select('last_name')
    phone$: Observable<string> = this.select('phone')
    profile_picture$: Observable<string> = this.select('profile_picture')
    website$: Observable<string> = this.select('website')
    moto$: Observable<string> = this.select('moto')
    address$: Observable<string> = this.select('address')
    facebook$: Observable<string> = this.select('facebook')
    instagram$: Observable<string> = this.select('instagram')
    linkedin$: Observable<string> = this.select('linkedin')
    twitter$: Observable<string> = this.select('twitter')

  constructor(protected override store: UserDataStore) {
    super(store);
  }
}