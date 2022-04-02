import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { SidebarComponent } from './main/sidebar/sidebar.component';
import { ChatroomComponent } from './main/chatroom/chatroom.component';
import { PagecardComponent } from './cards/pagecard/pagecard.component';
import { ChatlistComponent } from './main/chatroom/chatlist/chatlist.component';
import { ActionBarComponent } from './components/action-bar/action-bar.component';
import { ListItemComponent } from './cards/list-item/list-item.component';
import { ChatComponent } from './main/chatroom/chat/chat.component';
import { ChatitemComponent } from './cards/chatitem/chatitem.component';
import { ContactsComponent } from './main/contacts/contacts.component';
import { ContactslistComponent } from './main/contacts/contactslist/contactslist.component';
import { ContactsdetailsComponent } from './main/contacts/contactsdetails/contactsdetails.component';
import { ProfileComponent } from './main/profile/profile.component';
import { ProfiledetailsComponent } from './main/profile/profiledetails/profiledetails.component';
import { DetailscardComponent } from './cards/detailscard/detailscard.component';
import { ProfileupdateComponent } from './main/profile/profileupdate/profileupdate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './main/login/login.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LoginloaderComponent } from './main/loginloader/loginloader.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SidebarComponent,
    ChatroomComponent,
    PagecardComponent,
    ChatlistComponent,
    ActionBarComponent,
    ListItemComponent,
    ChatComponent,
    ChatitemComponent,
    ContactsComponent,
    ContactslistComponent,
    ContactsdetailsComponent,
    ProfileComponent,
    ProfiledetailsComponent,
    DetailscardComponent,
    ProfileupdateComponent,
    LoginComponent,
    SpinnerComponent,
    LoginloaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
