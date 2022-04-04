import { Injectable } from '@angular/core';

import {chatContent} from '../../interfaces/chat.interface'
import { user } from 'src/interfaces/user.interface';

import { UserDataStore } from './UserData.store';
import { UserDataQuery } from './UserData.query';

@Injectable({
    providedIn: 'root'
})
export class UserDataService {

    constructor(private UserDataStore:UserDataStore, private userDataQuery:UserDataQuery) {}
    
    SetAllUserData(userdata: user[]) {

        const data: user = userdata[0]

        this.UserDataStore.update(state => ({
            ...state,
            activechats: data.activechats,
            chats: data.chats,
            contacts: data.contacts,
            blocked: data.blocked,
            notifications: data.notifications,
            id: data._id,
            updatedAt: data.updatedAt,
            email: data.email,
            birthday: data.birthday,
            name: data.name,
            last_name: data.last_name,
            phone: data.phone,
            profile_picture: data.profile_picture,
            website: data.website,
            moto: data.moto,
            address: data.address,
            facebook: data.facebook,
            instagram: data.instagram,
            linkedin: data.linkedin,
        }))

    }

    getPersonalData() {
        return this.userDataQuery.getPersonalDataObservables()
    }

    getPersonalDataSnapshop() {
        return this.userDataQuery.getPersonalDataRaw()
    }

    setPersonalAccountData(newData: any) {

        this.UserDataStore.update(state => ({
            ...state,
            name: newData.name,
            last_name: newData.last_name,
            email: newData.email,
            birthday: newData.birthday,
            phone: newData.phone,
            profile_picture: newData.profile_picture,
            website: newData.website,
            moto: newData.moto,
            address: newData.address
        }))

    }

    setSocialAccountData(newData: any) {

        this.UserDataStore.update(state => ({
            ...state,
            facebook: newData.facebook,
            twitter: newData.twitter,
            instagram: newData.instagram,
            linkedin: newData.linkedin,
        }))
    }

    getChatList() {
        const activechats = this.userDataQuery.getActiveChatSnapshot()
        const chats = this.userDataQuery.getChatsSnapshot()
        const contacts = this.userDataQuery.getContactsSnapshot()

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

        let chats = this.userDataQuery.getChatsSnapshot()

        chats.map((chat) => {
            if(chat.id === chatid) {
                chat.content.push(msg)
            }
        })

        this.UserDataStore.update(state => ({
            ...state,
            chats
        }))

    }

    getContactsList () {
        return this.userDataQuery.contacts$
    }

    getUserId() {
        return this.userDataQuery.getIdSnapshot()
    }

    getUserFullname() {
        const fullName = this.userDataQuery.getNameSnapshot()
        return `${fullName.name} ${fullName.last_name}`
    }

    getProfilePicture(): string {
        return this.userDataQuery.getProfileImageSnapshot()
    }


}