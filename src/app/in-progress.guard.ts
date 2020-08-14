import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { GameStorageService } from './game-storage.service';

@Injectable({
  providedIn: 'root'
})
export class InProgressGuard implements CanActivate {
  constructor(private gameStorage: GameStorageService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
      return this.canContinueGameInProgress();
    }

    async canContinueGameInProgress(): Promise<boolean> {
      const isGameInProgress = await this.gameStorage.isGameInProgress();
      if (isGameInProgress) {
      } else {
        this.router.navigate(['/new-game']);
      }
    
      return isGameInProgress;
  }
}
