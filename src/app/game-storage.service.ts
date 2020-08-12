import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { GameData, AppData } from './game-data';
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

  async loadAppData(): Promise<AppData> {
    let data = await this.storage.get('bravoApp')
    return data || { hasSeenInstructions: false, isInProgress: false };
  }

  async saveAppData(appData: AppData): Promise<AppData> {
    await this.storage.set('bravoApp', appData);
    return appData;
  }

  async isGameInProgress(): Promise<boolean> {
    try {
      const data = await this.loadAppData();
      return (data.isInProgress !== undefined && data.isInProgress);
    } catch (e) {
      console.error(e); 0
    }
  }

  async hasSeenInstructions(): Promise<boolean> {
    try {
      const data = await this.loadAppData();
      return (data.hasSeenInstructions);
    } catch (e) {
      console.error(e); 0
    }
  }

  async markSeenInstructions(): Promise<AppData> {
    try {
      const data = await this.loadAppData();
      data.hasSeenInstructions = true;
      return this.saveAppData(data);
    } catch (e) {
      console.error(e); 0
    }
  }

  async markGameInProgress(flag: boolean) {
    const data = await this.loadAppData();
    data.isInProgress = flag;
    this.saveAppData(data);
  }

  async newGame(): Promise<GameData> {
    try {
      const data = await this.loadGame();
      await this.saveGame(emptyData);
    } catch (e) {
      console.error(e);
    } finally {
      return emptyData;
    }
  }
}

export const emptyData: GameData = {
  score: [0, 0, 0, 0, 0, 0],
  card: null,
  categories: [
    'lyrics',
    'bookTitle',
    'movieTitle',
    'songTitle',
    'movieQuote'
  ],
  hasTimer: true,
  maxCards: 100,
  maxTimer: 60,
  timeRemaining: 60
}
