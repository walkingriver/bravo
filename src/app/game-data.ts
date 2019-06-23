import { GameCard } from './game-card';

export interface GameData {
  score: number[];
  card: GameCard;
  timeRemaining?: number;
  hasSeenInstructions?: boolean
}
