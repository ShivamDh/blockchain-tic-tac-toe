import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

import { BlockchainService } from './blockchain.service';

import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
import { GamesComponent } from './games/games.component';


@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    GamesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
  ],
  exports: [
  	BrowserAnimationsModule,
  	MatButtonModule,
  	MatTableModule,
  ],
  providers: [BlockchainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
