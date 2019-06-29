import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { InstructionGuard } from './instruction.guard';
import { NewGameGuard } from './new-game.guard';
import { InProgressGuard } from './in-progress.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',
    canActivate: [InstructionGuard],
  },
  {
    path: 'game',
    canActivate: [InstructionGuard, InProgressGuard],
    loadChildren: './game/game.module#GamePageModule'
  },
  {
    path: 'instructions',
    loadChildren: './instructions/instructions.module#InstructionsPageModule'
  },
  { path: 'game-over', loadChildren: './game-over/game-over.module#GameOverPageModule' },
  { path: 'new-game', loadChildren: './new-game/new-game.module#NewGamePageModule', canActivate: [NewGameGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
