import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { DomUiService } from 'src/app/services/dom-ui.service';
import { UserDataService } from 'src/app/store/UserData.service';

import { environment } from 'src/environments/environment';
import { ControlSocketService } from 'src/app/services/control-socket.service';


@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss']
})
export class AddFriendComponent implements OnInit {

  // Data
  contact_username: string = ''
  user_username: string = ''

  //Dom
  showSpinner: boolean = false

  constructor(private DomUiService:DomUiService,
              private UserDataService:UserDataService,
              private HttpClient:HttpClient,
              private ControlSocketService:ControlSocketService) {}

  ngOnInit(): void {
    this.user_username = this.UserDataService.getUsername()
  }

  submitHandler() {

    this.showSpinner = true

    const body = {
      username: this.contact_username,
      sender_id: this.UserDataService.getUserIdSnapshot(),
      sender_name: this.UserDataService.getUserFullname(),
      picture: this.UserDataService.getProfilePictureSnapshot(),
      time: new Date()
    }

    if(this.checkContact(this.contact_username)) {
      
      this.HttpClient.post(`${environment.API_URL}/addfriend`, body).subscribe(res => {

        const response = res as {status: string, id: string}
        let socket;

        if(response.status === 'true') {
          socket = this.ControlSocketService.createNewSocket(response.id)
          this.contact_username = ''
          this.showSpinner = false
          alert(`Send Friend Request to ${this.contact_username}`)
          socket.emit('friendrequest', body)
          socket.emit('disconnect')
        }
        else {
          alert('Username does not exist')
          this.showSpinner = false
        }

      })
    }
    else {
      alert('bad input')
      this.showSpinner = false
    }
  }

  checkContact(username: string): boolean {

    let canAddContact: boolean = true

    if(this.user_username === this.contact_username) return false


    this.UserDataService.getContactsList().subscribe(contacts => {
      contacts.forEach((contact) => {
        if(contact.username === username) canAddContact = false
      })
    }).unsubscribe()

   return canAddContact
  }

  exitHandler() {
    this.DomUiService.setShowAddFriend(false)
  }

}
