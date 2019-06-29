import { Component, OnInit } from '@angular/core';
import { GameStorageService } from '../game-storage.service';
import { GameData } from '../game-data';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.page.html',
  styleUrls: ['./game-over.page.scss'],
})
export class GameOverPage implements OnInit {
  data: GameData;

  constructor(
    private gameStorage: GameStorageService
  ) { }

  async ngOnInit() {
    this.data = await this.gameStorage.loadGame();
    await this.gameStorage.markGameInProgress(false);
  }
}
