import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';

import { GridComponent } from './grid/grid.component'

import { BlockchainService } from './blockchain.service';

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

	constructor(private blockchainService: BlockchainService) {
		this.title = 'Blockchain Tic-Tac-Toe';
		this.titleHeader = 'Welcome to ' + this.title + '!';
		this.gameOver = false;
		this.resetButtonString = 'Reset Game';
	}

	receiveNewState($event) {
		this.gameOver = $event;

		console.log(this.blockchainService);
	}

	resetGame() {
		this.gameOver = false;
		this.grid.clear();
	}

}
