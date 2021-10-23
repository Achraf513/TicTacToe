import { TictoeService } from './../../services/tictoe.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-tic-toe',
  templateUrl: './tic-toe.component.html',
  styleUrls: ['./tic-toe.component.scss'],
})
export class TicToeComponent implements OnInit {
  positions: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  myTurn: boolean = true;
  iLost: boolean = false;
  ready: boolean = false;
  enemyReady: boolean = false;
  gameEnded: boolean = false;
  btnText: string = 'Retry?';
  constructor(private tictoeService: TictoeService) {
    tictoeService.lastPos.subscribe((lastPos) => {
      this.positions[lastPos] = -1;
      this.myTurn = true;
    });
    tictoeService.lost.subscribe((lost) => {
      this.iLost = lost;
      if (this.iLost) this.gameEnded = true;
    });
    tictoeService.enemyReady.subscribe((ready) => {
      this.enemyReady = ready;
      if (this.ready && this.enemyReady) {
        this.positions = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.myTurn = true;
        this.iLost = false;
        this.ready = false;
        this.enemyReady = false;
        this.gameEnded = false;
        this.btnText = 'Retry?';
      }
    });
  }
  selectTile(pos: number) {
    if (this.myTurn && this.positions[pos] == 0) {
      this.positions[pos] = 1;
      this.myTurn = false;
      this.tictoeService.yourTurn(pos);
      if (this.checkIfIwon()) {
        this.tictoeService.iwon();
        this.gameEnded = true;
      }
    }
  }
  retry() {
    this.btnText = 'Ready';
    this.ready = !this.ready;
    this.tictoeService.ready();
    if (this.ready && this.enemyReady) {
      this.positions = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.myTurn = true;
      this.iLost = false;
      this.ready = false;
      this.enemyReady = false;
      this.gameEnded = false;
      this.btnText = 'Retry?';
    }
  }
  checkIfIwon(): boolean {
    if (
      this.positions[0] == 1 &&
      this.positions[1] == 1 &&
      this.positions[2] == 1
    ) {
      return true;
    }
    if (
      this.positions[3] == 1 &&
      this.positions[4] == 1 &&
      this.positions[5] == 1
    ) {
      return true;
    }
    if (
      this.positions[6] == 1 &&
      this.positions[7] == 1 &&
      this.positions[8] == 1
    ) {
      return true;
    }
    if (
      this.positions[0] == 1 &&
      this.positions[3] == 1 &&
      this.positions[6] == 1
    ) {
      return true;
    }
    if (
      this.positions[1] == 1 &&
      this.positions[4] == 1 &&
      this.positions[7] == 1
    ) {
      return true;
    }
    if (
      this.positions[2] == 1 &&
      this.positions[5] == 1 &&
      this.positions[8] == 1
    ) {
      return true;
    }
    if (
      this.positions[0] == 1 &&
      this.positions[4] == 1 &&
      this.positions[8] == 1
    ) {
      return true;
    }
    if (
      this.positions[2] == 1 &&
      this.positions[4] == 1 &&
      this.positions[6] == 1
    ) {
      return true;
    }
    return false;
  }

  ngOnInit(): void {}
}
