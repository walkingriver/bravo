import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { InstructionGuard } from './instruction.guard';

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
    canActivate: [InstructionGuard],
    loadChildren: './game/game.module#GamePageModule'
  },
  {
    path: 'instructions',
    loadChildren: './instructions/instructions.module#InstructionsPageModule'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
