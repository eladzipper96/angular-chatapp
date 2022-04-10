import { Component, OnInit, AfterViewChecked, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ChatService } from 'src/app/main/chatroom/store/chat.service';
import { UserDataService } from 'src/app/store/UserData.service';

import { chatContent } from 'src/interfaces/chat.interface';
import { contact } from 'src/interfaces/contact.interface';

import { dateMinuteHandler } from 'src/helper_functions/dates';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss','./chatplaceholder.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked, OnDestroy {

  @ViewChild('chatContent') private chatContent!: ElementRef;

  // Icons //
  options: string =  '../../../../assets/icons/options.svg'
  send: string = '../../../../assets/icons/arrow_right.svg'

  // Images //
  people_talking: string = '../../../../assets/images/people_talking.jpg'

  // Subscriptions
  chatIdSubscription: Subscription = new Subscription;
  chatContactIdSubscription: Subscription = new Subscription
  socketSubscription = new Subscription

  // Data //
  contactImage$! :Observable<string>
  chatName$!: Observable<string>
  messagesList$!: Observable<chatContent[]>;

  contactId: string = ''
  lastSeen: string = '12:23'
  chatId!: string | boolean;
  contactsList!: contact[];

  message: string = ''

  constructor(private ChatService:ChatService, private UserDataService:UserDataService) { }


  ngOnInit(): void {
    this.contactImage$ = this.ChatService.getChatDetails().image
    this.chatName$ = this.ChatService.getChatDetails().name
    this.messagesList$ = this.ChatService.getChatContent()

    this.chatIdSubscription = this.ChatService.getActiveChatId().subscribe(val => this.chatId = val)
    this.chatContactIdSubscription = this.ChatService.getChatDetails().contactId.subscribe(val => this.contactId = val)
    
    this.socketSubscription = this.ChatService.getSocket().subscribe((socket: any) => {
      socket.on('message', (msg: chatContent) => {
        this.reviceMessageHandler(msg)
      })
    })

    this.scrollToBottom()
  }

  ngAfterViewChecked(): void {
    this.message = ''
    this.scrollToBottom()
  }

  ngOnDestroy(): void {
    this.chatIdSubscription.unsubscribe()
    this.chatContactIdSubscription.unsubscribe()

    this.ChatService.getSocket().subscribe((socket) => {
      socket.disconnect()
    }).unsubscribe()
    
    this.socketSubscription.unsubscribe()
  }

  reviceMessageHandler(msg_content: chatContent) {
    if(msg_content.author !== this.UserDataService.getUserIdSnapshot() && msg_content.value.length > 0) {
      if(msg_content.chatid === this.chatId){
        this.ChatService.AddMessage(msg_content)
      }
      this.UserDataService.updateChatList(msg_content.chatid as string,msg_content)
    }
  }

  addMessageHandler(msg_content: string) {

    const now = new Date()

    const new_msg: chatContent = {
      authorname: this.UserDataService.getUserFullname(),
      author: this.UserDataService.getUserIdSnapshot(),
      id: (Math.random()*1000).toFixed(0),
      read: false,
      value: msg_content,
      year: {
        day: now.getDate(),
        month: now.getMonth(),
        year: now.getFullYear()
      },
      time: `${now.getHours()}:${dateMinuteHandler(now.getMinutes())}`,
      chatid: this.chatId as string
    }
    this.message = ''
    this.ChatService.AddMessage(new_msg)
    this.UserDataService.updateChatList(this.chatId as string,new_msg)
    this.ChatService.emit('message', new_msg)
    this.ChatService.emitToControlSocket(this.contactId,{...new_msg, chatid: this.contactId})

  }

  scrollToBottom(): void {
    try {
        this.chatContent.nativeElement.scrollTop = this.chatContent.nativeElement.scrollHeight;
    } catch(err) { }                 
}



}
