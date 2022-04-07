import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DomUiService } from 'src/app/services/dom-ui.service';
import { UserDataService } from 'src/app/store/UserData.service';
import { notifications } from 'src/interfaces/notifications.interface';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  notifcations$!: Observable<notifications[]>

  constructor(private DomUiService:DomUiService, private UserDataService:UserDataService) { }

  ngOnInit(): void {
    this.notifcations$ = this.UserDataService.getNotifications()
  }

  exitHandler() {
    this.DomUiService.setShowNotifications(false)
  }

  deleteNotification(item: notifications) {
    this.UserDataService.deleteNotification(item)
  }

  acceptFriendRequestHandler(item: notifications) {
    this.UserDataService.acceptFriendRequest(item)
  }

}
