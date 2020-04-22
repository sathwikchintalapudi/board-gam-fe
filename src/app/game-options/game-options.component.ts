import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-options',
  templateUrl: './game-options.component.html',
  styleUrls: ['./game-options.component.scss']
})
export class GameOptionsComponent {
  gameId;
  constructor(private router: Router) { }

  createNewGame() {
    this.router.navigate(['/game']);
  }
  
  joinGame(gameId: string) {
    this.router.navigate([`/game/${gameId}`]);
  }
}
