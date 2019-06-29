import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { GameStorageService } from './game-storage.service';

@Injectable({
  providedIn: 'root'
})
export class NewGameGuard implements CanActivate {
  constructor(
    private alertCtrl: AlertController,
    private gameStorage: GameStorageService,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  Promise<boolean> {
    return this.newGame();
  }

  async newGame(): Promise<boolean> {
    const promise = new Promise<boolean>(async (resolve, reject) => {
      const isGameInProgress = await this.gameStorage.isGameInProgress();
      const alert = await this.alertCtrl.create({
        header: 'Start a new game?',
        message: 'Reset the scores and start a brand new game?',
        buttons: [
          {
            text: 'Nevermind',
            role: 'cancel',
            handler: () => {
              resolve(false);
            }
          },
          {
            text: 'New Game',
            handler: async () => {
              resolve(true);
            }
          }
        ]
      });

      if (isGameInProgress) {
        await alert.present();
      } else {
        resolve(true);
      }
    });

    const canActivate = await promise;
    return canActivate;
  }
}
