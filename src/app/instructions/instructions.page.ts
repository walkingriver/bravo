import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController } from '@ionic/angular';

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
  slides: Slide[];
  showSkip = true;

  constructor(public menu: MenuController) { }

  ngOnInit() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ngOnDestroy() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }
  
  async onSlideChange(event) {
    this.showSkip = !(await event.currentTarget.isEnd());
  }
}
