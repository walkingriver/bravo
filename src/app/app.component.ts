import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
const { SplashScreen, StatusBar } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  public appPages = [
    {
      title: 'Home',
      url: '/',
      icon: 'home'
    },
    {
      title: 'New Game',
      url: '/new-game',
      icon: 'mic'
    },
    {
      title: 'Instructions',
      url: '/instructions',
      icon: 'newspaper'
    }
  ];

  constructor(
    private platform: Platform
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // StatusBar.styleDefault();
      SplashScreen.hide();
    });
  }

  async ngOnInit() { }
}
