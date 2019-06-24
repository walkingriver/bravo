import { Component, OnInit, Input, Output } from '@angular/core';
import { GameCard } from '../game-card';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
})
export class GameCardComponent implements OnInit {
  @Input() hide: boolean;
  @Input() card: GameCard;
  @Output() nextCard;

  constructor() { }

  ngOnInit() { }

  getNextCard() {
    
  }
}
