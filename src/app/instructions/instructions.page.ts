import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MenuController, IonSlides } from '@ionic/angular';
import { GameStorageService } from '../game-storage.service';

export interface Slide {
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.page.html',
  styleUrls: ['./instructions.page.scss'],
})
export class InstructionsPage implements OnInit, OnDestroy {
  @ViewChild('slider') slider: IonSlides;
  slides: Slide[];
  showSkip = true;

  constructor(private gameStorage: GameStorageService,
    public menu: MenuController) {

  }

  async ngOnInit() {
    // the root left menu should be disabled on the tutorial page
    this.slider.options = { autoHeight: true };
    this.menu.enable(false);

    const data = await this.gameStorage.loadGame();
    data.hasSeenInstructions = true;
    await this.gameStorage.saveGame(data);
  }

  ngOnDestroy() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

  async onSlideChange() {
    // await this.slider.updateAutoHeight();
    this.showSkip = !(await this.slider.isEnd());
  }
}
