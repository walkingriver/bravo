import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { GamePage } from './game.page';
import { GameCardComponent } from '../game-card/game-card.component';

const routes: Routes = [
  {
    path: '',
    component: GamePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GamePage, GameCardComponent]
})
export class GamePageModule {}
