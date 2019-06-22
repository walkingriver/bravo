import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameStorageService } from '../game-storage.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { interval, Subscription, Subject, timer } from 'rxjs';
import { take, map, takeWhile, switchMap, tap, filter } from 'rxjs/operators';
import { GameCard } from '../game-card';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit, OnDestroy {
  card: GameCard = { class: '', rule: '', text: '', title: '' };
  score: number[] = [0, 0, 0, 0, 0, 0];
  rule = '';
  allCards = {};
  timerMax = 60;

  timeRemaining = this.timerMax;
  sub: Subscription;
  hide = true;

  private cardDrawn$ = new Subject();

  constructor(private gameStorage: GameStorageService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    console.log({ route: this.route.snapshot });
    this.resetCards();

    this.sub = this.cardDrawn$.pipe(
      tap({ next: () => { this.hide = true; this.timeRemaining = this.timerMax + 1; } }),
      switchMap(() => timer(250, 1000)),
      tap({ next: () => { this.hide = false; this.timeRemaining--; } }),
      filter(() => this.timeRemaining < 0)
    ).subscribe({ next: () => this.getNextCard() });

    const data = await this.gameStorage.loadGame();
    this.score = data.score;
    this.getNextCard();
  }

  async ngOnDestroy() {
    await this.gameStorage.saveGame({ score: this.score, card: this.card, timeRemaining: this.timeRemaining });
    this.sub.unsubscribe();
  }

  addScore(team) {
    this.score[team]++;
    this.timeRemaining += 15;
    if (this.timeRemaining > 999) {this.timeRemaining = 999;}
    this.gameStorage.saveGame({score: this.score, card: this.card, timeRemaining: this.timeRemaining});
  }

  resetCards() {
    this.allCards = {
      nouns: { words: this.nouns.sort(this.shuffle), index: 0, ruleKey: 'nocat' },
      adjectives: { words: this.adjectives.sort(this.shuffle), index: 0, ruleKey: 'nocat' },
      categories: { words: this.categories.sort(this.shuffle), index: 0, ruleKey: 'cat' },
      verbs: { words: this.verbs.sort(this.shuffle), index: 0, ruleKey: 'nocat' },
      prepositions: { words: this.prepositions.sort(this.shuffle), index: 0, ruleKey: 'nocat' },
      adverbs: { words: this.adverbs.sort(this.shuffle), index: 0, ruleKey: 'nocat' },
      pronouns: { words: this.pronouns.sort(this.shuffle), index: 0, ruleKey: 'nocat' }
    };
  }

  shuffle() {
    return 0.5 - Math.random();
  }

  timerColor() {
    if (this.timeRemaining > this.timerMax / 2) {
      return 'success';
    } else if (this.timeRemaining > this.timerMax / 4) {
      return 'warning'
    } else {
      return 'danger';
    }
  }

  getNextCard() {
    var list = this.randomList(this.allCards);
    var text = list.words[list.index++];
    var currentRule = this.randomList(this.cardRules);
    this.card.class = currentRule.class;
    this.card.title = currentRule.title;
    if (text) {
      this.card.text = text;
    } else {
      list.index = 0;
      list.words = list.words.sort(this.shuffle);
      this.getNextCard();
    }
    if (list.ruleKey === 'cat') {
      this.rule = currentRule.cat;
    }
    else {
      this.rule = currentRule.nocat;
    };

    // this.showBanner();
    this.cardDrawn$.next();
  };
  
  randomList(obj) {
    var keys = Object.keys(obj)
    return obj[keys[keys.length * Math.random() << 0]];
  }

  adjectives = ['Poor', 'Mid', 'Tender', 'East/West', 'Late/Later', 'Lost', 'Strong', 'Great', 'Happy', 'Short', 'Young', 'Deep', 'Much', 'Blue', 'Yellow', 'Very', 'Small', 'High', 'Only', 'Cool', 'Cruel', 'Some', 'More', 'Crying', 'One', 'Pretty', 'Funny', 'Tall', 'Next', 'Above', 'Black', 'Purple',];
  nouns = ['Funk', 'Circle', 'Ocean', 'Afternoon', 'Summer', 'Music', 'Wine', 'War', 'Heaven', 'Mr/Mrs', 'Land', 'Piano', 'Heart', 'Papa/Daddy', 'Moon', 'Dream', 'Train', 'Shop', 'Door', 'Good-Bye', 'Thank You', 'Soul', 'Window', 'Moon', 'Saturday', 'Room', 'Radio', 'Skin', 'Don\'t', 'Mama/Mommy', 'Job', 'God', 'Fire', 'Son', 'Fool', 'Things', 'Christmas', 'Girl', 'Devil', 'Time', 'Bird', 'Road', 'Mary', 'Sister', 'Evening', 'Candle', 'Light', 'City', 'Diamond', 'Chain', 'Body', 'California', 'Birthday', 'Ticket', 'Lover', 'House', 'World', 'Sue/Susan', 'Honey', 'Man', 'Moment', 'Liar', 'Life', 'Sign', 'Blues/Blue', 'Finger', 'Sky', 'Calendar', 'Rebel', 'Gun', 'Arms', 'Color', 'Rose', 'Girlfriend', 'Prayer', 'Boat', 'Car', 'Winter', 'Child', 'Thrill', 'Going', 'Book', 'Piece', 'Star', 'Money', 'Lips', 'Sun', 'Plane', 'Tomorrow', 'Way', 'L.A.',];
  categories = ['Numbers Above 1000', 'Occupations', 'Christmas', 'Pets', 'Movement', 'Surfing', 'Names Of Months', 'The Color Red', 'Cities', 'Cars A-N', 'Money', 'Alcoholic Beverages', 'Nationalities', 'School', 'Boys\' Names T-Z', 'Boats', 'Girls\' Names H-N', 'The Beach', 'Disasters', 'Cars O-Z', 'Happiness', 'Girls\' Names T-Z', 'Bad Guys', 'Birds', 'Clothes Below The Waist', 'Clothes Above The Waist', 'Historical Figures', 'Opposites', 'Luck', 'Parties', 'The Sun', 'Numbers 11-20', 'America', 'Foreign Language', 'Girls\' Names A-G', 'Military/War', 'Fruit', 'Good Guys', 'Vegetables',];
  verbs = ['Begin', 'Return', 'Can', 'Forget', 'End', 'Try', 'Look', 'Wait', 'Teach', 'Wake', 'Rock', 'Surf', 'Fall', 'Dance', 'Steal', 'Drive', 'Let', 'Sit', 'Sleep', 'Should/Could', 'Roll', 'Beat', 'Cheat', 'Whisper', 'Saw', 'Please', 'Can\'t', 'Shake', 'Travel', 'Die', 'Wish', 'Burn', 'Ride', 'Play', 'Keep', 'Send', 'Try', 'Can', 'Like', 'Bring', 'Got', 'Listen', 'Kill', 'Hear/Heard', 'Pray', 'Will', 'Make', 'Help', 'Have', 'See', 'May', 'Dream', 'Blow',];
  prepositions = ['If', 'On', 'Oh', 'By', 'Because',];
  adverbs = ['Suddenly', 'Once', 'Not', 'When', 'Apart', 'Forever', 'Sometimes', 'Again', 'Up', 'Down', 'There', 'So', 'Away', 'North', 'Near', 'Far', 'Nowhere', 'Since', 'No', 'Over', 'Yes',];
  pronouns = ['Him', 'You', 'She', 'Nobody', 'This', 'They', 'That',];

  cardRules = {
    lyrics: { title: 'Song Lyrics', nocat: 'Sing a song with lyrics containing the word...', cat: 'Sing a song pertaining to...', 'class': 'song' },
    bookTitle: { title: 'Book Title', nocat: 'Name a book title containing the word...', cat: 'Name a book title pertaining to...', 'class': 'book' },
    movieTitle: { title: 'Movie/TV Title', nocat: 'Name a movie or TV show title containing the word...', cat: 'Name a movie or TV show title pertaining to...', 'class': 'movie' },
    songTitle: { title: 'Song Title', nocat: 'Name a song title containing the word...', cat: 'Name a song title pertaining to...', 'class': 'song' },
    movieQuote: { title: 'Movie/TV Quote', nocat: 'Say a line from a movie or TV show containing the word...', cat: 'Say a line from a movie or TV show pertaining to...', 'class': 'movie' },
  };


}
