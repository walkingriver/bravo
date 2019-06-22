import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameStorageService {


  // constructor(private storage: Storage) {
  //   console.log('Hello GameStorageProvider Provider');
  // }

  // saveGame(gameData): Promise<any> {
  //   return this.storage.set('bravoGame', gameData);
  // }

  // async loadGame(): Promise<any> {
  //   let score = await this.storage.get('bravoGame');
  //   if (!score) {
  //     score = [0, 0, 0, 0, 0, 0];
  //   }

  //   return score;
  // }

  // async newGame(): Promise<any> {
  //   await this.saveGame([0, 0, 0, 0, 0, 0]);
  //   return this.loadGame();
  // }

}
