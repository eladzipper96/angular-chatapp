import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/main/chatroom/store/chat.service';
import { UserDataService } from 'src/app/userdata.service';

import {chat} from '../../../../interfaces/chat.interface'

@Component({
  selector: 'app-chatlist',
  templateUrl: './chatlist.component.html',
  styleUrls: ['./chatlist.component.scss']
})
export class ChatlistComponent implements OnInit {

  chatList!: chat[];

  constructor(private UserDataService: UserDataService, private ChatService:ChatService) { }

  ngOnInit(): void {
    this.chatList = this.UserDataService.getChatList()
  }

  onClickHandler(chat: chat) {
    console.log(chat)
    this.ChatService.setActiveChatId(chat.id)
    this.ChatService.setChatContent(chat.content)
    this.ChatService.setChatDetails({name: chat.name, image: chat.profile_picture})
  }

  updateChatList(searchParam: string): void {
    const completeList = this.UserDataService.getChatList()
    let new_list: chat[] = []

    completeList.forEach((chat) => {
      if(chat.name.toLowerCase().includes(searchParam.toLowerCase())) {
        new_list.push(chat)
      }
    })

    this.chatList = new_list;

  }

}
