import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GameStorageService } from './game-storage.service';

@Injectable({
  providedIn: 'root'
})
export class InstructionGuard implements CanActivate {
  constructor(
    private gameStorage: GameStorageService,
    private router: Router) { }

   canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    return this.checkInstructions();
  }

  async checkInstructions(): Promise<boolean> {
    const data = await this.gameStorage.loadGame();
    if (data.hasSeenInstructions) {
      return true;
    } else {
      this.router.navigate(['/instructions'])
      return false;
    }
  }
}
