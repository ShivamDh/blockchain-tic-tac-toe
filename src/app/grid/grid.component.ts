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

	constructor() {
		this.grids = Array(9).fill(-1);
		this.gameMessage = "It's Player X's turn";
	}

	ngOnInit() {

	}

	cellClicked(id: number) {
		if (this.grids[id] == -1) {
			if (this.turnNumber % 2) {
				this.grids[id] = 1;
				this.gameMessage = this.gameMessage.replace("X", "O");
			} else {
				this.grids[id] = 0;
				this.gameMessage = this.gameMessage.replace("O", "X");

			}
			++this.turnNumber;
	  		console.log(id);
			console.log(SHA1(JSON.stringify(this.grids)).toString());
		} else {
			var oldMessage = this.gameMessage;
			this.gameMessage = "Invalid cell clicked, try again";
			setTimeout( () => {
				this.gameMessage = oldMessage;
			}, 1000);
		}
	}

}
