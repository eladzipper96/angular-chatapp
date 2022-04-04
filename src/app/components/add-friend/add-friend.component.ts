import { Component, OnInit } from '@angular/core';
import { DomUiService } from 'src/app/services/dom-ui.service';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss']
})
export class AddFriendComponent implements OnInit {

  constructor(private DomUIService:DomUiService) { }

  ngOnInit(): void {
  }

  exitHandler() {
    this.DomUIService.setShowAddFriend(false)
  }

}
