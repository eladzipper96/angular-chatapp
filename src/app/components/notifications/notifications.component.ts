import { Component, OnInit } from '@angular/core';
import { DomUiService } from 'src/app/services/dom-ui.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  constructor(private DomUiService:DomUiService) { }

  ngOnInit(): void {
  }

  exitHandler() {
    this.DomUiService.setShowNotifications(false)
  }

}
