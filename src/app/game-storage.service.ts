import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { GameData } from './game-data';
@Injectable({
  providedIn: 'root'
})
export class GameStorageService {
  constructor(private storage: Storage) {
    console.log('Hello GameStorageProvider Provider');
  }

  saveGame(gameData: GameData): Promise<GameData> {
    return this.storage.set('bravoGame', gameData);
  }

  async loadGame(): Promise<GameData> {
    try {
      let data = await this.storage.get('bravoGame');
      return data || emptyData;
    } catch (e) {
      console.error(e);
      return emptyData;
    }
  }

  async newGame(): Promise<any> {
    try {
      await this.saveGame(emptyData);
    } catch (e) {
      console.error(e);
    } finally {
      return this.loadGame();
    }
  }
}

const emptyData: GameData = {
  score: [0, 0, 0, 0, 0, 0],
  card: { class: '', rule: '', text: '', title: '' }
}
