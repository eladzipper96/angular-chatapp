import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {io} from 'socket.io-client'

import { environment } from 'src/environments/environment';
import { chatContent } from 'src/interfaces/chat.interface';
import { ChatQuery } from './chat.query';

import { ChatStore } from './chat.store';

@Injectable()
export class ChatService {

    constructor(private ChatStore:ChatStore, private ChatQuery:ChatQuery) {}

    socket$: BehaviorSubject<any> = new BehaviorSubject<any>(io(`${environment.API_URL}`, {query: {'chatid': '0'}}))

    emit(eventName: string, data: any) {
        this.socket$.getValue().emit(eventName,data)
    }

    getSocket() {
        return this.socket$.asObservable()
    }

    getActiveChatId () {
        return this.ChatQuery.activeChatId$
    }

    setActiveChatId (id: string) {

        this.ChatStore.update(state => ({
            ...state,
            activeChatId: id
        }))

        this.socket$.subscribe(socket => socket.disconnect()).unsubscribe()

        this.socket$.next(io(`${environment.API_URL}`, {
            query: {'chatid': id}
        }))

    }

    getChatContent() {
        return this.ChatQuery.chatContent$
    }

    setChatContent(new_values: chatContent[]) {
        this.ChatStore.update(state => ({
            ...state,
            chatContent: new_values
        }))
    }

    getChatDetails() {
        return this.ChatQuery.getChatDetails()
    }

    setChatDetails(values: {name: string, image:string, contactId: string}) {
        this.ChatStore.update(state => ({
            ...state,
            chatName: values.name,
            chatImage: values.image,
            chatContactId: values.contactId
        }))
    }

    AddMessage(newMessage: chatContent) {

        const currentContent = this.ChatQuery.getChatContent()

        this.ChatStore.update(state => ({
            ...state,
            chatContent: [...currentContent,newMessage]
        }))
    }

    emitToControlSocket(contactid: string,msg: any) {
        console.log('emitting to '+contactid)
        const socket = io(`${environment.API_URL}`, {query: {'chatid': contactid}});
        socket.emit('message', msg)
        // socket.disconnect()
    }



}