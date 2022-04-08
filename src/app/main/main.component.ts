import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { ControlSocketService } from '../services/control-socket.service';
import { DomUiService } from '../services/dom-ui.service';
import { UserDataService } from '../store/UserData.service';

import { notifications } from 'src/interfaces/notifications.interface';

import { playNotification, playMessage } from 'src/helper_functions/sounds';
import { chatContent } from 'src/interfaces/chat.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  // Images
  wave_image = '../../assets/images/wave.svg'
  sun_image = '../../assets/images/sun.png'
  sand_image = '../../assets/images/sand.png'
  kid_image = '../../assets/images/kid_in_beach.png'

  // Subscriptions
  controlSocketSubscription: Subscription = new Subscription

  // Data
  loginProcess$!: Observable<boolean>
  showOnEntrance$!: Observable<boolean>
  showAddFriend$!: Observable<boolean>
  showNotifications$!: Observable<boolean>

  constructor(private AuthService: AuthService,
              private DomUiSerivce:DomUiService,
              private ControlSocketService:ControlSocketService,
              private UserDataService:UserDataService) {}
             

  ngOnInit(): void {

    this.loginProcess$ = this.AuthService.inLoginProcess()
    this.showOnEntrance$ = this.AuthService.getShowOnEntrance()
    this.showAddFriend$ = this.DomUiSerivce.getShowAddFriend()
    this.showNotifications$ = this.DomUiSerivce.getShowNotifications()

    this.controlSocketSubscription = this.ControlSocketService.getSocket().subscribe(socket => {

    socket.on('friendrequest', ((notification: notifications) => {
      this.UserDataService.AddNewNotification(notification,'friend_request')
      this.DomUiSerivce.setHasNewNotifications(true)
      playNotification()
    }))

    socket.on('acceptfriend', ((data: any) => {
      this.UserDataService.addNewContact(data)
    }))

    socket.on('message', ((msg: chatContent) => {

      let chatid!: string;

      this.UserDataService.getChatsSnapshot().forEach((chat) => {
        if(chat.owners.includes(msg.author))
          chatid = chat.id
      })

      this.UserDataService.updateChatList(chatid,msg)
      playMessage()
    }))

    })

  }

  ngOnDestroy(): void {
    this.controlSocketSubscription.unsubscribe()
  }

}
