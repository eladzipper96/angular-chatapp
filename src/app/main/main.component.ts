import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

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
  loginProcessSubscription: Subscription =  new Subscription
  showOnEntranceSubscription: Subscription =  new Subscription
  showAddFriendSubscription: Subscription = new Subscription
  showNotificationsSubscription: Subscription = new Subscription
  controlSocketSubscription: Subscription = new Subscription

  // Data
  loginProcess: boolean = false
  showOnEntrance: boolean = true
  showAddFriend: boolean = false
  showNotifications: boolean = false

  constructor(private AuthService: AuthService,
              private DomUiSerivce:DomUiService,
              private ControlSocketService:ControlSocketService,
              private UserDataService:UserDataService) {}
             

  ngOnInit(): void {

    this.loginProcessSubscription = this.AuthService.inLoginProcess().subscribe(value => this.loginProcess = value)
    this.showOnEntranceSubscription = this.AuthService.getShowOnEntrance().subscribe(value => this.showOnEntrance = value)
    this.showAddFriendSubscription = this.DomUiSerivce.getShowAddFriend().subscribe(value => this.showAddFriend = value)
    this.showNotificationsSubscription = this.DomUiSerivce.getShowNotifications().subscribe(value => this.showNotifications = value)

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
    this.loginProcessSubscription.unsubscribe()
    this.showOnEntranceSubscription.unsubscribe()
    this.showAddFriendSubscription.unsubscribe()
    this.showNotificationsSubscription.unsubscribe()
    this.controlSocketSubscription.unsubscribe()
  }

}
