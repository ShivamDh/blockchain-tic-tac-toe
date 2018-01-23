import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgSwitchCase } from '@angular/common';

import { BlockchainService } from '../blockchain.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.sass']
})
export class GridComponent implements OnInit {

	// -1 = unfilled slot, 0 = O (letter), 1 = X (letter)
	grids: Array<Array<number>>;
	turnNumber: number;
	gameMessage: string;
	winnerInfo: any;
	
	@Input() gameOver: boolean;
	@Output() gameStateChange: EventEmitter<boolean> = new EventEmitter<boolean>();

	constructor(private blockchainService: BlockchainService) {
		this.grids = [];
		this.fillEmptyArray();
		this.gameMessage = "It's Player X's turn";
		this.winnerInfo = {};
		this.turnNumber = 1;
	}

	fillEmptyArray() {
		this.grids = Array(3).fill(0);
		this.grids = this.grids.map( () => Array(3).fill(-1));
	}

	ngOnInit() {

	}

	getClasses(row: number, col: number) {
		let className = "col-" + col.toString();

		if (!this.gameOver) {
			return className;
		}

		switch (this.winnerInfo.direction) {
			case 'horizontal':
				if (row === this.winnerInfo.cellRow) {
					className += ' selected';
				}
				break;

			case 'vertical':
				if (col === this.winnerInfo.cellCol) {
					className += ' selected';
				}
				break;

			case 'diagonal':
				if (row === col) {
					className += ' selected';
				}
				break;
			
			case 'anti-diagonal':
				if (row == this.grids.length-1-col) {
					className += ' selected';
				}
				break;
		}

		return className;
	}

	cellClicked(row: number, col: number) {
		if (this.gameOver) {
			return;
		}

		if (this.grids[row][col] == -1) {
			let gameWinner = this.turnNumber % 2 ? "X" : "O";

			if (gameWinner === "X") {
				this.grids[row][col] = 1;
				this.gameMessage = this.gameMessage.replace("X", "O");
			} else {
				this.grids[row][col] = 0;
				this.gameMessage = this.gameMessage.replace("O", "X");
			}
			++this.turnNumber;

			let gameState = this.isGameOver(row, col);
			if (gameState) {
				this.gameOver = true;
				let gameScore = 11 - this.turnNumber;

				if (this.turnNumber > 9) {
					gameWinner = "None";
					gameScore = 0;
				}

				this.blockchainService.addGameResult(gameWinner, gameScore, Date.now());
				this.gameStateChange.emit(true);
			}
		} else {
			let oldMessage = this.gameMessage;
			this.gameMessage = "Invalid cell clicked, try again";
			setTimeout( () => {
				this.gameMessage = oldMessage;
			}, 1000);
		}
	}

	// Add tic-tac-toe game logic to check if the game is completed
	isGameOver(row: number, col: number) {
		// Game can't be over until at least 5 total turns have been completed
		if (this.turnNumber > 5) {

			/*
				All logic used below can be applied to a tic-tac-toe board of any size	
			*/

			let newestCell = this.grids[row][col];

			// Horizontal 3-in-a-row
			if (this.grids[row].every( (e) => e === newestCell)) {
				this.gameOverMessage(this.grids[row][0]);
				this.winnerInfo = {
					direction: 'horizontal',
					cellRow: row
				}
				return true;
			}

			// Vertical 3-in-a-row
			if (this.grids.every( (r) => r[col] === newestCell)) {
				this.gameOverMessage(this.grids[0][col]);
				this.winnerInfo = {
					direction: 'vertical',
					cellCol: col
				}
				return true;
			}
			
			if (row === col) {
				// Diagonal (top-left to bottom-right) 3-in-a-row
				if (this.grids.every( (r, i) => r[i] === newestCell)) {
					this.gameOverMessage(this.grids[0][0]);
					this.winnerInfo = {
						direction: 'diagonal'
					}
					return true;
				}
			}

			if (row === this.grids.length - col - 1) {
				// Anti-Diagonal (top-right to bottom-left) 3-in-a-row
				if (this.grids.every( (r, i) => r[r.length-1-i] === newestCell)) {
					this.gameOverMessage(this.grids[0][this.grids[0].length-1]);
					this.winnerInfo = {
						direction: 'anti-diagonal'
					}
					return true;
				}
			}

			if (this.turnNumber > 9) {
				this.gameMessage = "Game has ended in a draw";
				return true;
			}

		}

		return false;
	}

	gameOverMessage(cell: number) {
		if (cell) {
			this.gameMessage = "Player X won the game";
		} else {
			this.gameMessage = "Player O won the game";
		}
	}

	clear() {
		this.fillEmptyArray();
		this.gameMessage = "It's Player X's turn";
		this.winnerInfo = {};
		this.turnNumber = 1;
	}

}
