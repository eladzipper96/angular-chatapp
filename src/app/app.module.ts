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

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SidebarComponent,
    LoginloaderComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
