import { GameCard } from './game-card';

export interface GameData {
  score: number[];
  card: GameCard;
  categories?: string[];
  timeRemaining?: number;
  hasTimer?: boolean;
  maxCards?: number;
  maxTimer?: number;
}

export interface AppData {
  hasSeenInstructions?: boolean;
  isInProgress?: boolean;
}
