import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { GameStorageService } from '../game-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Subject, timer } from 'rxjs';
import { switchMap, tap, filter } from 'rxjs/operators';
import { GameCard } from '../game-card';
import { AlertController, IonSlides } from '@ionic/angular';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit, OnDestroy {
  @ViewChild('slides') slider: IonSlides;

  cards: GameCard[] = [];
  score: number[] = [0, 0, 0, 0, 0, 0];
  rules = [''];
  allCards = {};
  timerMax = 60;
  cardsPerGame = 100;

  timeRemaining = this.timerMax;
  sub: Subscription;
  hide = false;

  private cardDrawn$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private alertCtrl: AlertController,
    private gameStorage: GameStorageService,
    private router: Router
  ) { }

  async ngOnInit() {
    console.log({ route: this.route.snapshot });
    this.resetCards();
    await this.slider.lockSwipeToPrev(true);

    this.sub = this.cardDrawn$.pipe(
      tap({ next: () => { this.timeRemaining = this.timerMax; } }),
      switchMap(() => timer(250, 1000)),
      tap({ next: () => { this.timeRemaining--; } }),
      filter(() => this.timeRemaining < 0)
    ).subscribe({ next: () => this.drawCard() });

    const data = await this.gameStorage.loadGame();
    this.score = data.score;

    // Set up 100 cards for a single game
    for (let i = 0; i < this.cardsPerGame; i++) {
      this.getNextCard();
    }

    // This will start the timer
    this.cardDrawn$.next();
  }

  async ngOnDestroy() {
    await this.gameStorage.saveGame({ score: this.score, card: this.cards[0], timeRemaining: this.timeRemaining });
    this.sub.unsubscribe();
  }

  addScore(team) {
    this.score[team]++;
    this.timeRemaining += 15;
    if (this.timeRemaining > 999) { this.timeRemaining = 999; }
    this.gameStorage.saveGame({ score: this.score, card: this.cards[0], timeRemaining: this.timeRemaining });
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
          handler: async () => {
            const data = await this.gameStorage.newGame(); // calls and returns loadGame 
            this.score = data.score;
            this.drawCard();
          }
        }
      ]
    });
    return await alert.present();
  }

  getNextCard() {
    const list = this.randomList(this.allCards);
    const text = list.words[list.index++];
    const currentRule = this.randomList(this.cardRules);
    const card: GameCard = { class: '', rule: '', text: '', title: '' };
    card.class = currentRule.class;
    card.title = currentRule.title;
    if (text) {
      card.text = text;
    } else {
      list.index = 0;
      list.words = list.words.sort(this.shuffle);
      this.getNextCard();
    }
    if (list.ruleKey === 'cat') {
      card.rule = currentRule.cat;
    }
    else {
      card.rule = currentRule.nocat;
    };

    this.cards.push(card);
  }

  /** When a slide event occurs, reset the timer. */
  onSlideChanged() {
    this.cardDrawn$.next();
  }

  /** If a manual draw event occurs, advance the slider */
  async drawCard() {
    const isEnd = await this.slider.isEnd();
    if (isEnd) {
      this.router.navigate(['/game-over']);
    } else {
      this.slider.slideNext();
    }
  };

  randomList(obj) {
    const keys = Object.keys(obj)
    return obj[keys[keys.length * Math.random() << 0]];
  }

  adjectives = ['Poor', 'Mid', 'Tender', 'East/West', 'Late/Later', 'Lost', 'Strong', 'Great', 'Happy', 'Short', 'Young', 'Deep', 'Much', 'Blue', 'Yellow', 'Very', 'Small', 'High', 'Only', 'Cool', 'Cruel', 'Some', 'More', 'Crying', 'One', 'Pretty', 'Funny', 'Tall', 'Next', 'Above', 'Black', 'Purple', 'Across', 'Kind', 'White', 'In', 'Dark', 'Big', 'Two', 'Lonely', 'Without', 'Real', 'Blind', 'Long', 'New', 'Golden/Gold', 'Crazy', 'My', 'Old', 'Three', 'Easy', 'Sorry', 'Just', 'Every', 'Out', 'Dead', 'Last', 'Together', 'Free', 'Cold', 'Close', 'Still', 'Behind', 'South/Southern', 'Hot', 'Little', 'Fine', 'Red', 'Hard', 'Under', 'Back', 'Our', 'Green', 'Four', 'Around', 'Jungle', 'Foolish', 'Sad', 'With', 'Many', 'What', 'Jealous', 'Tight', 'Round', 'Anymore', 'Good', 'Bad', 'Mean', 'Strange/Stranger', 'Wild', 'Wise', 'Alone', 'Slow', 'Higher',];

  nouns = ['Funk', 'Circle', 'Ocean', 'Afternoon', 'Summer', 'Music', 'Wine', 'War', 'Heaven', 'Mr/Mrs', 'Land', 'Piano', 'Heart', 'Papa/Daddy', 'Moon', 'Dream', 'Train', 'Shop', 'Door', 'Good-Bye', 'Thank You', 'Soul', 'Window', 'Saturday', 'Room', 'Radio', 'Skin', 'Don\'t', 'Mama/Mommy', 'Job', 'God', 'Fire', 'Son', 'Fool', 'Things', 'Christmas', 'Girl', 'Devil', 'Time', 'Bird', 'Road', 'Mary', 'Sister', 'Evening', 'Candle', 'Light', 'City', 'Diamond', 'Chain', 'Body', 'California', 'Birthday', 'Ticket', 'Lover/Love', 'House', 'World', 'Sue/Susan', 'Honey', 'Man', 'Moment', 'Liar', 'Life', 'Sign', 'Blues/Blue', 'Finger', 'Sky', 'Calendar', 'Rebel', 'Gun', 'Arms', 'Color', 'Rose', 'Girlfriend', 'Prayer', 'Boat', 'Car', 'Winter', 'Child', 'Thrill', 'Going', 'Book', 'Piece', 'Star', 'Money', 'Lips', 'Sun', 'Plane', 'Tomorrow', 'Way', 'L.A.', 'Sunshine', 'Stone', 'Darling', 'Word', 'Mouth', 'Hand', 'Glass', 'Secret', 'Luck', 'Taste', 'Game', 'Sea', 'Morning', 'People', 'Day', 'Wind', 'Rain', 'Earth', 'Family', 'Monday', 'Friday', 'Sunday', 'Tonight', 'River', 'Blood', 'Everything', 'Somebody', 'Cloud', 'Work', 'Party', 'June', 'Trouble', 'Sweetheart', 'Teenager', 'Grease', 'Flower', 'Today', 'Miles', 'New York City', 'Grass', 'Mountain', 'Father', 'Second', 'Angel', 'Night', 'Dog', 'Eye/Eyes', 'Boy', 'Pink', 'Home', 'Faith', 'Yesterday', 'Field', 'Toe', 'Magic', 'Bell', 'Water', 'Shame', 'Rhythm', 'Pain', 'Sand', 'reason', 'Street', 'Year', 'Brother', 'Kiss', 'Believe', 'Cat', 'Woman', 'Town', 'Baby', 'Mother', 'Power', 'Lady', 'Doll', 'Thunder/Lightning', 'Everyone/Everybody', 'Ain\'t', 'Sugar', 'Guitar', 'Photograph', 'Doctor', 'Chance', 'Wife', 'Show', 'Tear', 'Breath/Breathe', 'Fish/Kinds of Fish', 'Jungle', 'Guy', 'Queen', 'Boyfriend', 'Head', 'Tree', 'Highway', 'Place', 'Nothing', 'Track', 'Melody', 'Friend', 'Phone/Telephone', 'Week', 'Taxi', 'Hair', 'Sound', 'Hello', 'Step/Stair', 'Class', 'Beauty', 'King', 'Jack/John', 'Band', 'Memory',];

  categories = ['Numbers Above 1000', 'Occupations', 'Christmas', 'Pets', 'Movement', 'Surfing', 'Names Of Months', 'The Color Red', 'Cities', 'Cars A-N', 'Money', 'Alcoholic Beverages', 'Nationalities', 'School', 'Boys\' Names T-Z', 'Boats', 'Girls\' Names H-N', 'The Beach', 'Disasters', 'Cars O-Z', 'Happiness', 'Girls\' Names T-Z', 'Bad Guys', 'Birds', 'Clothes Below The Waist', 'Clothes Above The Waist', 'Historical Figures', 'Opposites', 'Luck', 'Parties', 'The Sun', 'Numbers 11-20', 'America', 'Foreign Language', 'Girls\' Names A-G', 'Military/War', 'Fruit', 'Good Guys', 'Vegetables', 'Numbers Above 100', 'Counties', 'Planes/Trains', 'Celestial', 'Zoo Animals', 'Names of States', 'Nonsense', 'Size', 'Weddings', 'Famous People', 'Camp', 'Sports', 'Devils/Angels', 'Breaking Up', 'Geographic Features', 'Space', 'Numbers 1-10', 'Boys\' Names A-G', 'Boys\' Names O-S', 'Shoes', 'Girls\' Names O-S', 'Mail', 'Dreams', 'Numbers 50-100', 'Holidays Other Than Christmas', 'Games', 'Farm Animals', 'Seasons', 'Numbers 21-50', 'Time', 'Body Parts', 'One-Word Titles', 'Traveling', 'Food', 'Times of Day', 'Household Items', 'Person\'s Name in Title', 'Jewels', 'Monsters', 'Boys\' Names H-N', 'Plants', 'Musical Instruments in Title', 'Question in Title', 'Insects', 'Show Tunes', 'Weather', 'Dances', 'The Country', 'Relatives', 'Dying', 'Biblical References', 'Towns', 'Movies', 'Groove', 'Work', 'Parties', 'Chidren\'s Songs', 'Spelling', 'Rock and Roll', 'Going Away', 'Jails/Prison',];

  verbs = ['Begin', 'Return', 'Can', 'Forget', 'End', 'Try', 'Look', 'Wait', 'Teach', 'Wake', 'Rock', 'Surf', 'Fall', 'Dance', 'Steal', 'Drive', 'Let', 'Sit', 'Sleep', 'Should/Could', 'Roll', 'Beat', 'Cheat', 'Whisper', 'Saw', 'Please', 'Can\'t', 'Shake', 'Travel', 'Die', 'Wish', 'Burn', 'Ride', 'Play', 'Keep', 'Send', 'Like', 'Bring', 'Got', 'Listen', 'Kill', 'Hear/Heard', 'Pray', 'Will', 'Make', 'Help', 'Have', 'See', 'May', 'Dream', 'Blow', 'Know/Knew', 'Touch', 'Care', 'Fight', 'Smile', 'Hold', 'Write', 'Search', 'Catch', 'Wave', 'Put', 'Change', 'Go', 'Pull', 'Sing', 'Broke', 'Tell', 'Live', 'Find', 'Fly', 'Promise', 'Say', 'Miss', 'Ring', 'Turn', 'Rise', 'Climb', 'Feel', 'Come', 'Take', 'Walk', 'Said', 'Think', 'Want', 'Shout', 'Bless', 'Does', 'Call', 'Run', 'Marry', 'Understand', 'Laugh', 'Watch', 'Hug', 'Eat', 'Knock', 'Leave', 'Grow', 'Stop', 'Sweet', 'Need', 'Sail', 'Stay', 'Move', 'Drink', 'Stand', 'Release', 'Shot/Shoot', 'Give', 'Get', 'Talk',];

  prepositions = ['If', 'On', 'Oh', 'By', 'Because', 'From', 'Until',];

  adverbs = ['Suddenly', 'Once', 'Not', 'When', 'Apart', 'Forever', 'Sometimes', 'Again', 'Up', 'Down', 'There', 'So', 'Away', 'North', 'Near', 'Far', 'Nowhere', 'Since', 'No', 'Over', 'Yes', 'Never', 'Too', 'Where', 'Here', 'How',];

  pronouns = ['Him', 'You', 'She', 'Nobody', 'This', 'They', 'That', 'Who', 'He', 'Her', 'Me', 'Yours',];


  cardRules = {
    lyrics: { title: 'Song Lyrics', nocat: 'Sing a song with lyrics containing the word...', cat: 'Sing a song pertaining to...', 'class': 'song' },
    bookTitle: { title: 'Book Title', nocat: 'Name a book title containing the word...', cat: 'Name a book title pertaining to...', 'class': 'book' },
    movieTitle: { title: 'Movie/TV Title', nocat: 'Name a movie or TV show title containing the word...', cat: 'Name a movie or TV show title pertaining to...', 'class': 'movie' },
    songTitle: { title: 'Song Title', nocat: 'Name a song title containing the word...', cat: 'Name a song title pertaining to...', 'class': 'song' },
    movieQuote: { title: 'Movie/TV Quote', nocat: 'Say a line from a movie or TV show containing the word...', cat: 'Say a line from a movie or TV show pertaining to...', 'class': 'movie' },
  };


}
