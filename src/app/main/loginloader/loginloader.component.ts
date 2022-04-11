import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loginloader',
  templateUrl: './loginloader.component.html',
  styleUrls: ['./loginloader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginloaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
