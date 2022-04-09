import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { map, Observable } from 'rxjs';
import {io} from 'socket.io-client'

import { UserDataStore } from './UserData.store';
import { UserDataQuery } from './UserData.query';

import { contact } from 'src/interfaces/contact.interface';
import { notifications } from 'src/interfaces/notifications.interface';
import {chat, chatContent} from '../../interfaces/chat.interface'
import { user } from 'src/interfaces/user.interface';

import { sortContactsByName } from 'src/helper_functions/contacts';
import { sortByUpdateAt } from 'src/helper_functions/chats';

import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class UserDataService {

    constructor(private UserDataStore:UserDataStore, private userDataQuery:UserDataQuery, private HttpClient:HttpClient) {}

    getPersonalData() {
        return this.userDataQuery.getPersonalDataObservables()
    }

    getPersonalDataSnapshop() {
        return this.userDataQuery.getPersonalDataSnapshot()
    }

    getContactsList() :Observable<contact[]> {
        return this.userDataQuery.contacts$
    }

    getContactsListSnapshot(): contact[] {
        return this.userDataQuery.getContactsSnapshot()
    }

    getUserId(): Observable<string> {
        return this.userDataQuery.id$
    }

    getUserIdSnapshot(): string {
        return this.userDataQuery.getIdSnapshot()
    }

    getUserFullname(): string {
        const fullName = this.userDataQuery.getNameSnapshot()
        return `${fullName.name} ${fullName.last_name}`
    }

    getProfilePicture(): Observable<string> {
        return this.userDataQuery.profile_picture$
    }

    getProfilePictureSnapshot(): string {
        return this.userDataQuery.getValue().profile_picture
    }

    getNotifications() {
        return this.userDataQuery.getNotifications()
    }

    getChatsSnapshot() {
        return this.userDataQuery.getChatsSnapshot()
    }

    getChatList() {

        const contacts = this.userDataQuery.getContactsSnapshot()

        return this.userDataQuery.chats$.pipe((map((chats => {
            return chats.map((chat) => {
                let temp_chat = {...chat}

                contacts.forEach((contact) => {
                    if(chat.owners.includes(contact.id)) {
                        temp_chat.name = `${contact.name} ${contact.last_name}`
                        temp_chat.profile_picture = contact.profile_picture
                        temp_chat.contactId = contact.id
                    }
                })

                return temp_chat
            })
        }))))

    }

    getUsername() {
        return this.userDataQuery.getUsernameSnapshot()
    }
    
    SetAllUserData(userdata: user[]) {

        const data: user = userdata[0]

        this.UserDataStore.update(state => ({
            ...state,
            activechats: data.activechats,
            chats: data.chats,
            contacts: sortContactsByName(data.contacts),
            blocked: data.blocked,
            notifications: data.notifications,
            id: data._id,
            username: data.username,
            updatedAt: data.updatedAt,
            email: data.email,
            birthday: data.birthday.substring(0,10),
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

    AddNewNotification(item: any,type: string) {

        const notifcations = this.userDataQuery.getNotifcationsSnapshop()

        const newNotification: notifications = {
            type: type,
            from_id: item.sender_id,
            from_name: item.sender_name,
            picture: item.picture,
            time: item.time
        }

        this.UserDataStore.update(state => ({
            ...state,
            notifications: [newNotification,...notifcations]
        }))

    }

    deleteNotification(notification : notifications) {

        this.HttpClient.post(`${environment.API_URL}/notification`, {
            type: 'remove',
            id: this.userDataQuery.getIdSnapshot(),
            from_id: notification.from_id
          }).subscribe(() => {
              
            let notifcations = this.userDataQuery.getNotifcationsSnapshop()
            notifcations = notifcations.filter(item => item.from_id !== notification.from_id)
            
            this.UserDataStore.update(state => ({
                ...state,
                notifications: notifcations
            }))
          })

    }

    addNewActiveChat(chatid: string) {
        this.UserDataStore.update((state => ({
            ...state,
            activechats: [...state.activechats,chatid]
        })))
    }

    addNewContact(data: any) {

        const newContact: contact =  {
            name: data.name,
            username: data.username,
            last_name: data.last_name,
            birthday: data.birthday,
            phone: data.phone,
            email: data.email,
            website: data.website,
            address: data.address,
            facebook: data.facebook,
            twitter: data.twitter,
            instagram: data.instagram,
            linkedin: data.linkedin,
            moto: data.moto,
            id: data.id,
            profile_picture: data.profile_picture,
            last_seen: data.last_seen
        }

        const newChat: chat = {
            id: data.chatid,
            owners: data.chatowners,
            content: [],
            type: 'friend',
            updatedAt: new Date().toDateString(),
            name: `${data.name} ${data.last_name}`,
            profile_picture: data.profile_picture,
            contactId: data.id
        }

        this.UserDataStore.update((state => ({
            ...state,
            contacts: sortContactsByName([...state.contacts, newContact]),
            chats: [...state.chats,newChat]
        })))
    
        this.addNewActiveChat(data.chatid)
    }

    acceptFriendRequest(notification: notifications) {

        const userId = this.userDataQuery.getIdSnapshot()
        const userData = this.userDataQuery.getPersonalDataSnapshot()

        this.HttpClient.post(`${environment.API_URL}/create_newchat`, {
            owners:[userId,notification.from_id],
            accepted: userId
        }).subscribe((response) => {

            const _response = response as any
            let socket;

            socket = io(`${environment.API_URL}`, {query: {'chatid': notification.from_id}})

            socket.emit('acceptfriend', {
                chatid: _response.chatid,
                chatowners: [userId,notification.from_id],
                name: userData.name,
                username: userData.username,
                last_name: userData.last_name,
                birthday: userData.birthday,
                phone: userData.phone,
                email: userData.email,
                website: userData.website,
                address: userData.address,
                facebook: userData.facebook,
                twitter: userData.twitter,
                instagram: userData.instagram,
                linkedin: userData.linkedin,
                moto: userData.moto,
                id: userData.id,
                profile_picture: userData.profile_picture,
                last_seen: userData.last_seen
            })

            socket.emit('disconnect')

            this.addNewContact(_response)

            this.deleteNotification(notification)

        })
  
    }

    updateChatList(chatid: string,msg :chatContent): void {

        let newchats: chat[];

        this.getChatList().subscribe(chats => {
            newchats = chats.map((chat) => {
                if(chat.id === chatid) {
                    chat.content.push(msg),
                    chat.updatedAt = new Date().toISOString();
                }
                return chat
            })
        }).unsubscribe()

        this.UserDataStore.update(state => ({
            ...state,
            chats: sortByUpdateAt(newchats)
        }))

    }

}