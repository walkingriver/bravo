import { Component, OnInit, Input, Output } from '@angular/core';
import { GameCard } from '../game-card';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
})
export class GameCardComponent implements OnInit {
  @Input() maxCards: number;
  @Input() card: GameCard;

  constructor() { }

  ngOnInit() { }

  getNextCard() {
    
  }
}
