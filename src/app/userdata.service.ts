import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import {chat, chatContent} from '../interfaces/chat.interface'
import {contact} from 'src/interfaces/contact.interface';
import {notifications} from 'src/interfaces/notifications.interface'
import { user } from 'src/interfaces/user.interface';

export interface keyValuePair {
    key: string,
    value: string
}

@Injectable({
    providedIn: 'root'
})
export class UserDataService {

    activechats$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([])
    chats$: BehaviorSubject<chat[]> = new BehaviorSubject<chat[]>([])
    contacts$: BehaviorSubject<contact[]> = new BehaviorSubject<contact[]>([])
    blocked$: BehaviorSubject<string[]> =  new BehaviorSubject<string[]>([])
    notifications$: BehaviorSubject<notifications[]> = new BehaviorSubject<notifications[]>([])

    id$: BehaviorSubject<string> = new BehaviorSubject<string>('')
    updatedAt$: BehaviorSubject<string> = new BehaviorSubject<string>('')
    email$: BehaviorSubject<keyValuePair | string> = new BehaviorSubject<keyValuePair | string>('')
    birthday$: BehaviorSubject<keyValuePair | string> = new BehaviorSubject<keyValuePair | string>('')
    name$: BehaviorSubject<keyValuePair | string> = new BehaviorSubject<keyValuePair | string>('')
    last_name$: BehaviorSubject<keyValuePair | string> = new BehaviorSubject<keyValuePair | string>('')
    phone$: BehaviorSubject<keyValuePair | string> = new BehaviorSubject<keyValuePair | string>('')
    profile_picture$: BehaviorSubject<keyValuePair | string> = new BehaviorSubject<keyValuePair | string>('')
    website$: BehaviorSubject<keyValuePair | string> = new BehaviorSubject<keyValuePair | string>('')
    moto$: BehaviorSubject<keyValuePair | string> = new BehaviorSubject<keyValuePair | string>('')
    address$: BehaviorSubject<keyValuePair | string> = new BehaviorSubject<keyValuePair | string>('')
    facebook$: BehaviorSubject<keyValuePair | string> = new BehaviorSubject<keyValuePair | string>('')
    instagram$: BehaviorSubject<keyValuePair | string> = new BehaviorSubject<keyValuePair | string>('')
    linkedin$: BehaviorSubject<keyValuePair | string> = new BehaviorSubject<keyValuePair | string>('')
    twitter$: BehaviorSubject<keyValuePair | string> = new BehaviorSubject<keyValuePair | string>('')
    
    SetAllUserData(userdata: user[]) {
        const data: user = userdata[0]

        console.log(data)

        this.activechats$.next(data.activechats)
        this.chats$.next(data.chats)
        this.contacts$.next(data.contacts)
        this.blocked$.next(data.blocked)
        this.notifications$.next(data.notifications)

        this.id$.next(data._id)
        this.updatedAt$.next(data.updatedAt)
        this.email$.next({key: 'email', value: data.email})
        this.birthday$.next({key: 'birthday', value: data.birthday.substring(0,10)})
        this.name$.next({key: 'name', value: data.name})
        this.last_name$.next({key: 'last_name', value: data.last_name})
        this.phone$.next({key: 'phone', value: data.phone})
        this.profile_picture$.next({key: 'profile_picture', value: data.profile_picture})
        this.website$.next({key: 'website', value: data.website})
        this.moto$.next({key: 'moto', value: data.moto})
        this.address$.next({key: 'address', value: data.address})
        this.facebook$.next({key: 'facebook', value: data.facebook})
        this.instagram$.next({key: 'instagram', value: data.instagram})
        this.linkedin$.next({key: 'linkedin', value: data.linkedin})
        this.twitter$.next({key: 'twitter', value: data.twitter})
    }

    getPersonalData() {
        return [
            this.name$.asObservable(),
            this.last_name$.asObservable(),
            this.email$.asObservable(),
            this.birthday$.asObservable(),
            this.phone$.asObservable(),
            this.profile_picture$.asObservable(),
            this.website$.asObservable(),
            this.moto$.asObservable(),
            this.address$.asObservable(),
            this.facebook$.asObservable(),
            this.instagram$.asObservable(),
            this.linkedin$.asObservable(),
            this.twitter$.asObservable()
        ]
    }

    setPersonalAccountData(obj: any) {

        this.name$.next({key: 'name', value: obj.name})
        this.last_name$.next({key: 'last_name', value: obj.last_name})
        this.email$.next({key: 'email', value: obj.email})
        this.birthday$.next({key: 'birthday', value: obj.birthday})
        this.phone$.next({key: 'phone', value: obj.phone})
        this.profile_picture$.next({key: 'profile_picture', value: obj.profile_picture})
        this.website$.next({key: 'website', value: obj.website})
        this.moto$.next({key: 'moto', value: obj.moto})
        this.address$.next({key: 'address', value: obj.address})
    }

    setSocialAccountData(obj: any) {
        this.facebook$.next({key: 'facebook', value: obj.facebook})
        this.twitter$.next({key: 'twitter', value: obj.twitter})
        this.instagram$.next({key: 'instagram', value: obj.instagram})
        this.linkedin$.next({key: 'linkedin', value: obj.linkedin})
    }

    getChatList() {
        const activechats = this.activechats$.getValue()
        const chats = this.chats$.getValue()
        const contacts = this.contacts$.getValue()

        const filtered_chats = chats.filter((chat) => activechats.includes(chat.id))
        const aggerated_chats = filtered_chats.map((chat) => {
            let newchat: any = {...chat}

            contacts.forEach((contact) => {
                if(chat.owners.includes(contact.id)) {
                    newchat.name = `${contact.name} ${contact.last_name}`
                    newchat.profile_picture = contact.profile_picture
                }
            })

            return newchat
        })

        return aggerated_chats
    }

    updateChatList(chatid: string,msg :chatContent) {
        let chats = this.chats$.getValue()

        chats.map((chat) => {
            if(chat.id === chatid) {
                chat.content.push(msg)
            }
        })

        this.chats$.next(chats)
    }

    getContactsList () {
        return this.contacts$.asObservable()
    }

    getUserId() {
        return this.id$.getValue()
    }

    getUserFullname() {

        const name = this.name$.getValue() as keyValuePair
        const last_name = this.last_name$.getValue() as keyValuePair

        return `${name.value} ${last_name.value}`
    }



}