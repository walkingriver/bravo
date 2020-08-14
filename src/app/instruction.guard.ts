import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
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
    const hasSeenInstructions = await this.gameStorage.hasSeenInstructions();
    if (hasSeenInstructions) {
      return true;
    } else {
      this.router.navigate(['/instructions'])
      return false;
    }
  }
}
