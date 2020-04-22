import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { GameOptionsComponent } from './game-options/game-options.component';

const routes: Routes = [
  {
    path:'',
    component: GameOptionsComponent
  },
  {
    path:'game/:gameId',
    component: GameComponent
  },
  {
    path:'game',
    component: GameComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
