import { Component, Input, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/store/UserData.service';
import { notifications } from 'src/interfaces/notifications.interface';

@Component({
  selector: 'app-notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.scss']
})
export class NotificationCardComponent implements OnInit {

  //Icons
  exit_icon: string = '../../../assets/icons/exit.svg'

  // Data
  @Input() data!: notifications;
  @Input() onDelete!: Function;
  @Input() onAccept!: Function

  constructor(private UserDataService:UserDataService) { }

  ngOnInit(): void {

  }

  deleteHandler() {
    this.onDelete(this.data)
  }

  acceptRequestHandler() {
    this.onAccept(this.data)
  }

}
