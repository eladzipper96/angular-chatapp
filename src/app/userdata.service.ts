import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import {chat, chatContent} from '../interfaces/chat.interface'
import {contact} from 'src/interfaces/contact.interface';
import {notifications} from 'src/interfaces/notifications.interface'
import { user } from 'src/interfaces/user.interface';


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
    email$: BehaviorSubject<string> = new BehaviorSubject<string>('')
    birthday$: BehaviorSubject<string> = new BehaviorSubject<string>('')
    name$: BehaviorSubject<string> = new BehaviorSubject<string>('')
    last_name$: BehaviorSubject<string> = new BehaviorSubject<string>('')
    phone$: BehaviorSubject<string> = new BehaviorSubject<string>('')
    profile_picture$: BehaviorSubject<string> = new BehaviorSubject<string>('')
    website$: BehaviorSubject<string> = new BehaviorSubject<string>('')
    moto$: BehaviorSubject<string> = new BehaviorSubject<string>('')
    address$: BehaviorSubject<string> = new BehaviorSubject<string>('')
    facebook$: BehaviorSubject<string> = new BehaviorSubject<string>('')
    instagram$: BehaviorSubject<string> = new BehaviorSubject<string>('')
    linkedin$: BehaviorSubject<string> = new BehaviorSubject<string>('')
    twitter$: BehaviorSubject<string> = new BehaviorSubject<string>('')
    
    SetAllUserData(userdata: user[]) {
        const data: user = userdata[0]

        this.activechats$.next(data.activechats)
        this.chats$.next(data.chats)
        this.contacts$.next(data.contacts)
        this.blocked$.next(data.blocked)
        this.notifications$.next(data.notifications)

        this.id$.next(data._id)
        this.updatedAt$.next(data.updatedAt)
        this.email$.next(data.email)
        this.birthday$.next(data.birthday.substring(0,10))
        this.name$.next(data.name)
        this.last_name$.next(data.last_name)
        this.phone$.next(data.phone)
        this.profile_picture$.next(data.profile_picture)
        this.website$.next(data.website)
        this.moto$.next(data.moto)
        this.address$.next(data.address)
        this.facebook$.next(data.facebook)
        this.instagram$.next(data.instagram)
        this.linkedin$.next(data.linkedin)
        this.twitter$.next(data.twitter)
    }

    getPersonalData() {

        return {
            name: this.name$.asObservable(),
            last_name: this.last_name$.asObservable(),
            email: this.email$.asObservable(),
            birthdate: this.birthday$.asObservable(),
            phone: this.phone$.asObservable(),
            profile_picture: this.profile_picture$.asObservable(),
            website: this.website$.asObservable(),
            moto: this.moto$.asObservable(),
            address: this.address$.asObservable(),
            facebook: this.facebook$.asObservable(),
            instagram: this.instagram$.asObservable(),
            linkedin: this.linkedin$.asObservable(),
            twitter: this.twitter$.asObservable()
        }
    }



    setPersonalAccountData(obj: any) {

        this.name$.next(obj.name)
        this.last_name$.next(obj.last_name)
        this.email$.next(obj.email)
        this.birthday$.next(obj.birthday)
        this.phone$.next(obj.phone)
        this.profile_picture$.next(obj.profile_picture)
        this.website$.next(obj.website)
        this.moto$.next(obj.moto)
        this.address$.next(obj.address)
    }

    setSocialAccountData(obj: any) {
        this.facebook$.next(obj.facebook)
        this.twitter$.next(obj.twitter)
        this.instagram$.next(obj.instagram)
        this.linkedin$.next(obj.linkedin)
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

        const name = this.name$.getValue()
        const last_name = this.last_name$.getValue()

        return `${name} ${last_name}`
    }

    getProfilePicture(): string {

        let image = this.profile_picture$.getValue()
        if(typeof image !== 'string') return image

        return image
    }



}