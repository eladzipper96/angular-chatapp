import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ChatService } from 'src/app/main/chatroom/store/chat.service';
import { UserDataService } from 'src/app/store/UserData.service';

import {chat} from '../../../../interfaces/chat.interface'
import { sortByUpdateAt } from 'src/helper_functions/chats';

@Component({
  selector: 'app-chatlist',
  templateUrl: './chatlist.component.html',
  styleUrls: ['./chatlist.component.scss']
})
export class ChatlistComponent implements OnInit {

  chatList$!: Observable<chat[]>;
  TODAY: Date = new Date();

  constructor(private UserDataService: UserDataService, private ChatService:ChatService) { }

  ngOnInit(): void {
    this.chatList$ = this.UserDataService.getChatList().pipe(map((chats) => sortByUpdateAt(chats)))
  }
  
  onClickHandler(chat: chat) {
    this.ChatService.setActiveChatId(chat.id)
    this.ChatService.setChatContent(chat.content)
    this.ChatService.setChatDetails({name: chat.name, image: chat.profile_picture, contactId: chat.contactId})
  }

  updateChatList(searchParam: string): void {
    this.chatList$ =  this.UserDataService.getChatList().pipe(map((chats => {
      return chats.filter(chat => chat.name.includes(searchParam))
    })))
  }

  chatTimeHandler(updatedAt: string, last_msg_time: string): string {

    const _updatedAt = new Date(updatedAt)

    if(
      _updatedAt.getFullYear() === this.TODAY.getFullYear() &&
      _updatedAt.getMonth() === this.TODAY.getMonth() &&
      _updatedAt.getDate() === this.TODAY.getDate()) {
        return last_msg_time
      }

    else {
      return `${_updatedAt.getDate()}.${_updatedAt.getMonth()+1}.${_updatedAt.getFullYear()}`
    }
  }

}
