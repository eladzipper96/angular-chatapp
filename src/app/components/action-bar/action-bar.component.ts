import { Component, EventEmitter, OnInit, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { DomUiService } from 'src/app/services/dom-ui.service';

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss']
})
export class ActionBarComponent implements OnInit, OnDestroy {

  // Icons
  plus_icon = '../../../assets/icons/plus.svg'
  notifcations_icon = '../../../assets/icons/notifcations.svg'
  notifcations_black_icon = '../../../assets/icons/notifcations_black.svg'
  addfriend_icon = '../../../assets/icons/add_friend.svg'
  search_icon = '../../../assets/icons/search.svg'  

  // Outputs //
  @Output() searchEvent = new EventEmitter()

  // Subscription
  hasNewNotificationSubscription: Subscription = new Subscription

  // Data
  searchValue: string = ''
  hasNewNotification: boolean = false

  constructor(private DomUiService:DomUiService) {}

  ngOnInit(): void {
    this.DomUiService.getHasNewNotifications().subscribe(val => this.hasNewNotification = val)
  }

  ngOnDestroy(): void {
    this.hasNewNotificationSubscription.unsubscribe()
  }

  emitSearchValue(new_value: string) {
    this.searchValue = new_value
    this.searchEvent.emit(new_value)
  }

  AddFriendHandler(): void {
    this.DomUiService.setShowAddFriend(true)
  }

  NotificationsHandler(): void {
    this.DomUiService.setShowNotifications(true)
    this.DomUiService.setHasNewNotifications(false)
  }

}
