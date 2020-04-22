import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

export interface MancalaData {
  gameId: string;
  pits: number[];
  playerIdentifier: string;
  nextPlayer: string;
  gameOver: boolean;
  winner: string;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pitData: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  playerName: string = '';
  playerTurn: string = '';
  isGameOver: boolean;
  winner: string;
  gameId = '';
  routerParamSubscription: Subscription = new Subscription();

  constructor(private http: HttpClient, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit() {
    this.routerParamSubscription = this.route.params.subscribe(reqParams => {
      if (reqParams.gameId) {
        let params = new HttpParams().set('gameId', reqParams.gameId.toString());
        this.http.get<MancalaData>('/joingame', { params }).subscribe(response => {
          this.pitData = response.pits;
          this.playerName = response.playerIdentifier;
          this.gameId = response.gameId;
          this.playerTurn = response.nextPlayer;
        },(err) => {
          this.openDialog(err.error.errorDescription);
        });
      } else {
        this.http.post<MancalaData>('/newgame',{}).subscribe(response => {
          this.pitData = response.pits;
          this.playerName = response.playerIdentifier;
          this.gameId = response.gameId;
          this.playerTurn = 'GAME NOT STARTED';

        },(err) => {
          this.openDialog(err.error.errorDescription);
        });
      }
    });
  }

  updatePits(pitNumber: any) {
    let body = {
      selectedPit: pitNumber,
      currentTurn: this.playerName,
      gameId: this.gameId
    };
    this.http.put<MancalaData>('/updateMancalaData', body, {}).subscribe(response => {
      if(response.gameOver) {
        this.openDialog('Game Over & the winner is ' + response.winner)
     } 
      this.pitData = response.pits;
      this.playerTurn = response.nextPlayer;
    },
      (err) => {
        this.openDialog(err.error.errorDescription);
      });
  }

  openDialog(messgae: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      disableClose: true,
      width: '450px',
      data: messgae
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  refreshGame() {
    let params = new HttpParams().set('gameId', this.gameId);
    this.http.get<MancalaData>('/refreshGame', { params }).subscribe(response => {
      this.playerTurn = response.nextPlayer;
      if(response.gameOver) {
         this.openDialog('Game Over & the winner is '+ response.winner)
         this.playerTurn = 'GAME OVER';
      } 
        this.pitData = response.pits;
    });
  }
}
