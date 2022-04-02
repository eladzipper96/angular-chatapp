import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/chat.service';
import { UserDataService } from 'src/app/userdata.service';

import { chatContent } from 'src/interfaces/chat.interface';
import { contact } from 'src/interfaces/contact.interface';

import { dateMinuteHandler } from 'src/helper_functions/dates';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss','./chatplaceholder.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  @ViewChild('chat') private ChatElemment!: ElementRef;

  // Icons //
  options: string =  '../../../../assets/icons/options.svg'
  send: string = '../../../../assets/icons/arrow_right.svg'

  // Images //
  people_talking: string = '../../../../assets/images/people_talking.jpg'

  // Subscriptions
  chatIdSubscription: Subscription = new Subscription;
  chatContentSubscription: Subscription = new Subscription;
  chatNameSubscription: Subscription = new Subscription
  chatImageSubscription: Subscription = new Subscription
  socketSubscription = new Subscription

  // Data //
  topImage:string = 'https://i.ibb.co/TTGJN4C/dog-2.jpg'
  name: string = 'Israel Israeli'
  lastSeen: string = '12:32'

  chatId!: string | boolean;
  messagesList!: chatContent[];
  contactsList!: contact[];

  message: string = ''

  constructor(private ChatService:ChatService, private UserDataService:UserDataService) { }


  ngOnInit(): void {

    this.chatIdSubscription = this.ChatService.getActiveChatId().subscribe(val => this.chatId = val)
    this.chatContentSubscription = this.ChatService.getChatContent().subscribe(val => this.messagesList = val)
    this.chatNameSubscription = this.ChatService.getChatDetails().name.subscribe(val => this.name = val)
    this.chatImageSubscription = this.ChatService.getChatDetails().image.subscribe(val =>this.topImage = val )

    this.socketSubscription = this.ChatService.getSocket().subscribe((socket: any) => {
      socket.on('message', (msg: chatContent) => {
        this.reviceMessageHandler(msg)
      })
    })

  }

  ngOnDestroy(): void {
    this.chatIdSubscription.unsubscribe()
    this.chatContentSubscription.unsubscribe()
    this.chatNameSubscription.unsubscribe()
    this.chatImageSubscription.unsubscribe()

    this.ChatService.getSocket().subscribe((socket) => {
      socket.disconnect()
    }).unsubscribe()
    
    this.socketSubscription.unsubscribe()
  }

  reviceMessageHandler(msg_content: chatContent) {
    if(msg_content.author !== this.UserDataService.getUserId() && msg_content.value.length > 0) {
      this.ChatService.AddMessage(msg_content)
      this.UserDataService.updateChatList(this.chatId as string,msg_content)
    }
  }

  addMessageHandler(msg_content: string) {

    const now = new Date()

    const new_msg: chatContent = {
      authorname: this.UserDataService.getUserFullname(),
      author: this.UserDataService.getUserId(),
      id: (Math.random()*1000).toFixed(0),
      read: false,
      value: msg_content,
      date: {
        day: now.getDay(),
        month: now.getMonth(),
        year: now.getFullYear()
      },
      time: `${now.getHours()}:${dateMinuteHandler(now.getMinutes())}`,
      chatid: this.chatId as string
    }

    this.ChatService.AddMessage(new_msg)
    this.UserDataService.updateChatList(this.chatId as string,new_msg)
    this.ChatService.emit('message', new_msg)
    this.message = ''
  }



}
