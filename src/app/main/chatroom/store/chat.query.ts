import { Query } from '@datorama/akita';
import { ChatState, ChatStore } from './chat.store';

import { Observable } from 'rxjs';
import { chatContent } from 'src/interfaces/chat.interface';
import { Injectable } from '@angular/core';

@Injectable()
export class ChatQuery extends Query<ChatState> {  

    activeChatId$: Observable<string | boolean> = this.select('activeChatId')
    chatContent$: Observable<chatContent[]> = this.select('chatContent')
    chatName$: Observable<string> = this.select('chatName')
    chatImage$: Observable<string> = this.select('chatImage')
    chatContactId$: Observable<string> = this.select('chatContactId')


  constructor(protected override store: ChatStore) {
    super(store);
  }

  getChatContent() {
      return this.getValue().chatContent
  }

  getChatDetails() {
    return {
      name: this.chatName$,
      image: this.chatImage$,
      contactId: this.chatContactId$,
  }
  }

}