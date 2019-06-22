import { Component } from '@angular/core';

import { Platform, AlertController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GameStorageService } from './game-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Instructions',
      url: '/instructions',
      icon: 'paper'
    }
  ];

  constructor(
    private alertCtrl: AlertController,
    private gameStorage: GameStorageService,
    private nav: NavController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  async newGame() {
    const alert = await this.alertCtrl.create({
      header: 'Start a new game?',
      message: 'Reset the scores and start a brand new game?',
      buttons: [
        {
          text: 'Nevermind',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'New Game',
          handler: () => {
              this.nav.navigateRoot ('/game/new');
          }
        }
      ]
    });
    return await alert.present();  }

}
