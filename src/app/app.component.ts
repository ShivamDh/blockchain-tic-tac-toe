import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent {
	title: string;
	titleHeader: string;
	resetButtonString: string;
	gameOver: boolean;

	constructor() {
		this.title = 'Blockchain Tic-Tac-Toe';
		this.titleHeader = 'Welcome to ' + this.title + '!';
		this.gameOver = false;
		this.resetButtonString = 'Reset Game';
	}

	receiveNewState($event) {
		this.gameOver = $event;
	}

	resetGame() {
		this.gameOver = false;
	}

}
