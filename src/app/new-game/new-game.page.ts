import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameStorageService } from '../game-storage.service';
import { Router } from '@angular/router';
import { GameData } from '../game-data';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.page.html',
  styleUrls: ['./new-game.page.scss'],
})
export class NewGamePage implements OnInit, OnDestroy {
  data: GameData;

  constructor(
    private gameStorage: GameStorageService,
    private router: Router) { }

  async ngOnInit() {
    await this.gameStorage.markGameInProgress(false);
    const data: GameData = await this.gameStorage.newGame();
    this.data = data;
  }

  async ngOnDestroy() {
    await this.gameStorage.saveGame(this.data);
  }
}
