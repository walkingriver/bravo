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
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [InstructionGuard],
  },
  {
    path: 'game',
    canActivate: [InstructionGuard, InProgressGuard],
    loadChildren: () => import('./game/game.module').then(m => m.GamePageModule)
  },
  {
    path: 'game-start',
    loadChildren: () => import('./game/game.module').then(m => m.GamePageModule)
  },
  {
    path: 'instructions',
    loadChildren: () => import('./instructions/instructions.module').then(m => m.InstructionsPageModule)
  },
  { path: 'game-over', loadChildren: () => import('./game-over/game-over.module').then(m => m.GameOverPageModule) },
  { path: 'new-game', loadChildren: () => import('./new-game/new-game.module').then(m => m.NewGamePageModule), canActivate: [NewGameGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
