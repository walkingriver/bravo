import { AppPage } from './app.po';

describe('new App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });
  describe('default screen', () => {
    beforeEach(async () => {
      await page.navigateTo('/home');
    });
    it('should have a title saying Bravo', async () => {
      const title = await page.getPageOneTitleText();
      expect(title).toEqual('Bravo!');
    });
    
    it ('should be able to see new-game screen', async () => {
      await page.navigateTo('/new-game');
    });
    
    it ('should be able to click new game', async () => {
      await page.navigateTo('/new-game');
    });
    
    it ('should be able to load instructions', async () => {
      await page.navigateTo('/instructions');
    });
    
    it ('should be able to render game page', async () => {
      await page.navigateTo('/game-start');
      // await page.navigateTo('/new-game');
      // const newGameButton = page.getNewGameButton();
      // await newGameButton.click();
    });
  });
});

