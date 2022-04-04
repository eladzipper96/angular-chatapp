import { NgModule } from "@angular/core";

import { ChatroomComponent } from "./chatroom.component";
import { ChatComponent } from "./chat/chat.component";
import { ChatlistComponent } from "./chatlist/chatlist.component";
import { ChatitemComponent } from "src/app/cards/chatitem/chatitem.component";

import { PageCardModule } from "src/app/cards/pagecard/pagecard.module";
import { ActionBarModule } from "src/app/components/action-bar/action-bar.module";
import { ListItemModule } from "src/app/cards/list-item/list-item.module";

import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { ChatStore } from "./store/chat.store";
import { ChatQuery } from "./store/chat.query";
import { ChatService } from "./store/chat.service";

@NgModule({
    declarations: [
        ChatroomComponent,
        ChatComponent,
        ChatlistComponent,
        ChatitemComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        PageCardModule,
        ActionBarModule,
        ListItemModule
    ],
    providers:[
        ChatStore,
        ChatQuery,
        ChatService
    ],
    exports: [ChatroomComponent]

})
export class ChatRoomModule {}