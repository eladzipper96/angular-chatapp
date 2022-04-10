import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { SidebarComponent } from './main/sidebar/sidebar.component';
import { LoginloaderComponent } from './main/loginloader/loginloader.component';

import { LoginModule } from './main/login/login.module';
import { ProfileModule } from './main/profile/profile.module';
import { ContactsModule } from './main/contacts/contacts.module';
import { ChatRoomModule } from './main/chatroom/chatroom.module';
import { ListItemModule } from './cards/list-item/list-item.module';
import { AddFriendComponent } from './components/add-friend/add-friend.component';
import { OpacityscreenComponent } from './cards/opacityscreen/opacityscreen.component';
import { NG_ENTITY_SERVICE_CONFIG } from '@datorama/akita-ng-entity-service';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { NotificationCardComponent } from './cards/notification-card/notification-card.component';
import { AutofocusDirective } from './directives/autofocus.directive';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SidebarComponent,
    LoginloaderComponent,
    AddFriendComponent,
    OpacityscreenComponent,
    NotificationsComponent,
    NotificationCardComponent,
    AutofocusDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoginModule,
    ProfileModule,
    ContactsModule,
    ChatRoomModule,
    ListItemModule
  ],
  providers: [{ provide: NG_ENTITY_SERVICE_CONFIG, useValue: { baseUrl: 'https://jsonplaceholder.typicode.com' }}],
  bootstrap: [AppComponent]
})
export class AppModule { }
