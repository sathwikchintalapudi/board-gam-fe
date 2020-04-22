import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { GameComponent } from './game/game.component';
import { GameOptionsComponent } from './game-options/game-options.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatCardModule, MatGridListModule, MatFormFieldModule, MatInputModule, MatDialogModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { DialogComponent } from './dialog/dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    GameOptionsComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatCardModule,
    FormsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
  ],
  providers: [],
  entryComponents: [DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
