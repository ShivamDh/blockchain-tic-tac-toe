import { Component, OnInit } from '@angular/core';
import { NgSwitchCase } from '@angular/common';

import SHA1 = require('crypto-js/sha1');

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.sass']
})
export class GridComponent implements OnInit {
	// -1 = unfilled slot, 0 = O (letter), 1 = X (letter)
	grids = [];
	turnNumber = 1;
	gameMessage = "";
	gameOver = false;

	constructor() {
		this.grids = Array(3).fill(0);
		this.grids = this.grids.map( () => Array(3).fill(-1));
		this.gameMessage = "It's Player X's turn";
	}

	ngOnInit() {

	}

	cellClicked(row: number, col: number) {
		if (this.gameOver) {
			return;
		}

		if (this.grids[row][col] == -1) {
			if (this.turnNumber % 2) {
				this.grids[row][col] = 1;
				this.gameMessage = this.gameMessage.replace("X", "O");
			} else {
				this.grids[row][col] = 0;
				this.gameMessage = this.gameMessage.replace("O", "X");
			}
			++this.turnNumber;
			this.gameOver = this.isGameOver(row, col);
	  		console.log(this.grids);
			console.log(SHA1(JSON.stringify(this.grids)).toString());
		} else {
			var oldMessage = this.gameMessage;
			this.gameMessage = "Invalid cell clicked, try again";
			setTimeout( () => {
				this.gameMessage = oldMessage;
			}, 1000);
		}
	}

	// Add tic-tac-toe game logic to check if the game is completed
	// Checking 
	isGameOver(row: number, col: number) {
		// Game can't be over until at least 5 total turns have been completed
		if (this.turnNumber > 5) {

			/*
				All logic used below can be applied to a tic-tac-toe board of any size	
			*/

			var newestCell = this.grids[row][col];

			// Horizontal 3-in-a-row
			if (this.grids[row].every( (e) => e === newestCell)) {

				return true;
			}

			// Vertical 3-in-a-row
			if (this.grids.every( (r) => r[col] === newestCell)) {

				return true;
			}
			
			if (row === col) {
				// Diagonal (top-left to bottom-right) 3-in-a-row
				if (this.grids.every( (r, i) => r[i] === newestCell)) {

					return true;
				}
			}

			if (row === this.grids.length - col - 1) {
				// Anti-Diagonal (top-right to bottom-left) 3-in-a-row
				if (this.grids.every( (r, i) => r[r.length-1-i] === newestCell)) {

					return true;
				}
			}

		}

		return false;
	}

}
