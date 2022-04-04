import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { chatContent } from 'src/interfaces/chat.interface';

export interface ChatState {
   activeChatId: string | boolean;
   chatContent: chatContent[];
   chatName: string;
   chatImage: string
}

export function createInitialState(): ChatState {
  return {
    activeChatId: false,
    chatContent: [],
    chatName: '',
    chatImage: ''
  };
}

@Injectable()
@StoreConfig({ name: 'chat' })
export class ChatStore extends Store<ChatState> {
  constructor() {
    super(createInitialState());
  }
}