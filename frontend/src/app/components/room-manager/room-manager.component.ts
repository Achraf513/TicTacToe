import { TictoeService } from './../../services/tictoe.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-room-manager',
  templateUrl: './room-manager.component.html',
  styleUrls: ['./room-manager.component.scss'],
})
export class RoomManagerComponent implements OnInit {
  roomIDTxt: string = '';
  roomID: FormControl = new FormControl(
    '',
    Validators.compose([Validators.minLength(4), Validators.required])
  );

  constructor(private tictoeService: TictoeService) {}

  ngOnInit(): void {}

  async createRoom() {
    if (this.roomID.valid) {
      var exists = await this.tictoeService.roomExists(this.roomID.value);
      if (!exists.response) {
        this.tictoeService.createRoom(this.roomID.value);
      }
    }
  }

  async joinRoom() {
    if (this.roomID.valid) {
      var exists = await this.tictoeService.roomExists(this.roomID.value);
      console.log(exists);
      if (exists.response) {
        this.tictoeService.joinRoom(this.roomID.value);
      }
    }
  }
}
