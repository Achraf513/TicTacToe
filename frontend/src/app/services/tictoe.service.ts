import { EventEmitter, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { async } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class TictoeService {
  //add new event emitter
  insideARoom: EventEmitter<boolean> = new EventEmitter<boolean>();
  lastPos: EventEmitter<number> = new EventEmitter<number>();
  lost: EventEmitter<boolean> = new EventEmitter<boolean>();
  enemyReady: EventEmitter<boolean> = new EventEmitter<boolean>();
  /* 
//subscribe to the eventEmitter
animationEventEmitter.subscribe((bool) => {
   this.startAnimation(bool);
}); */
  constructor(private socket: Socket) {
    socket.on('urTurn', (data: number) => {
      this.lastPos.emit(data);
    });
    socket.on('iwon', (data: boolean) => {
      this.lost.emit(data);
    });
    socket.on('ready', (data: boolean) => {
      this.enemyReady.emit(data);
    });
  }
  async roomExists(roomId: string) {
    var response = await fetch(
      'http://localhost:3000/roomExists?roomId=' + roomId
    );
    var data = await response.json();
    return data;
  }
  createRoom(roomId: string) {
    this.socket.emit('createRoom', roomId);
    this.insideARoom.emit(true);
  }
  joinRoom(roomId: string) {
    this.socket.emit('joinRoom', roomId);
    this.insideARoom.emit(true);
  }
  yourTurn(lastPos: number) {
    this.socket.emit('urTurn', lastPos);
  }
  iwon() {
    this.socket.emit('iwon', true);
  }
  ready() {
    this.socket.emit('ready', true);
  }
}
