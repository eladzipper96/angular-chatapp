import { Component, Input, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/userdata.service';

@Component({
  selector: 'app-chatitem',
  templateUrl: './chatitem.component.html',
  styleUrls: ['./chatitem.component.scss']
})
export class ChatitemComponent implements OnInit {

  @Input() data: any;

  userId!: string;

  image: string = 'https://i.ibb.co/TTGJN4C/dog-2.jpg'
  content: string = 'moshe the king is the best!'
  name: string = 'Israel Israeli'
  time: string = '12:22'
  authorId: string = ''

  constructor(private UserDataService:UserDataService) { }

  ngOnInit(): void {
    this.userId = this.UserDataService.getUserId()
    this.content = this.data.value
    this.name = this.data.authorname
    this.time = this.data.time
    this.authorId = this.data.author
  }

}