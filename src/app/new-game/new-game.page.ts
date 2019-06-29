import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameStorageService } from '../game-storage.service';
import { Router } from '@angular/router';
import { GameData } from '../game-data';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.page.html',
  styleUrls: ['./new-game.page.scss'],
})
export class NewGamePage implements OnInit {
  data: {};

  constructor(
    private gameStorage: GameStorageService,
    private router: Router) { }

  async ngOnInit() {
    this.data= await this.gameStorage.newGame();
    await this.gameStorage.markGameInProgress(false);
  }

  async startNewGame() {
    await this.gameStorage.saveGame(<GameData>this.data);
    this.router.navigateByUrl('/game-start');
  }
}
