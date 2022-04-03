import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {io} from 'socket.io-client'

import { environment } from 'src/environments/environment';
import { chatContent } from 'src/interfaces/chat.interface';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    activeChatId$: BehaviorSubject<string | boolean> = new BehaviorSubject<string | boolean>(false);
    chatContent$: BehaviorSubject<chatContent[]> = new BehaviorSubject<chatContent[]>([]);
    chatName$: BehaviorSubject<string> = new BehaviorSubject<string>('');
    chatImage$: BehaviorSubject<string> = new BehaviorSubject<string>('');

    socket$: BehaviorSubject<any> = new BehaviorSubject<any>(io(`${environment.API_URL}`, {query: {'chatid': '0'}}))

    emit(eventName: string, data: any) {
        this.socket$.getValue().emit(eventName,{...data, year:'2022'})
    }

    getSocket() {
        return this.socket$.asObservable()
    }

    getActiveChatId () {
        return this.activeChatId$.asObservable()
    }

    setActiveChatId (id: string) {

        this.activeChatId$.next(id)

        const chatid = this.activeChatId$.getValue() as string

        this.socket$.next(io(`${environment.API_URL}`, {
            query: {'chatid': chatid}
        }))

    }

    getChatContent() {
        return this.chatContent$.asObservable()
    }

    setChatContent(new_values: chatContent[]) {
        this.chatContent$.next(new_values)
    }

    getChatDetails() {
        return {
            name: this.chatName$.asObservable(),
            image: this.chatImage$.asObservable()
        }
    }

    setChatDetails(obj: {name: string, image:string}) {
        this.chatName$.next(obj.name as string)
        this.chatImage$.next(obj.image)
    }

    AddMessage(new_msg: chatContent) {
        const current = this.chatContent$.getValue()
        this.chatContent$.next([...current,new_msg])
    }



}