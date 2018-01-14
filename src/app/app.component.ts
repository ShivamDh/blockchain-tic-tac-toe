import { Component, ViewChild } from '@angular/core';
import { NgIf } from '@angular/common';

import { GridComponent } from './grid/grid.component'

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


	@ViewChild(GridComponent)
	private grid: GridComponent;

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
		this.grid.clear();
	}

}
