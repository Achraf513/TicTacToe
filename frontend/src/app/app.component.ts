import { TictoeService } from './services/tictoe.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend';
  insideARoom: boolean = false;
  constructor(private tictoeService: TictoeService) {
    this.tictoeService.insideARoom.subscribe((insideARoom) => {
      this.insideARoom = insideARoom;
    });
  }
}
