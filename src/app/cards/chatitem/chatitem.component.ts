import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDataService } from 'src/app/store/UserData.service';

@Component({
  selector: 'app-chatitem',
  templateUrl: './chatitem.component.html',
  styleUrls: ['./chatitem.component.scss']
})
export class ChatitemComponent implements OnInit {

  @Input() data: any;
  @Input() contactImage!: string | null;

  userId$!: Observable<string>;
  userImage$!: Observable<string>
  
  content!: string;
  name!: string;
  time!: string;
  authorId!: string

  constructor(private UserDataService:UserDataService) { }

  ngOnInit(): void {

    this.userId$ = this.UserDataService.getUserId()
    this.userImage$ = this.UserDataService.getProfilePicture()
    this.content = this.data.value
    this.name = this.data.authorname
    this.time = this.data.time
    this.authorId = this.data.author
  }

}
