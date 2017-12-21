import { Component, OnInit } from '@angular/core';

import SHA1 = require('crypto-js/sha1');

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.sass']
})
export class GridComponent implements OnInit {
	// -1 = unfilled slot, 0 = O (letter), 1 = X (letter)
	grids = [];

	constructor() {
		this.grids = Array(9).fill(-1);
	}

	ngOnInit() {

	}

	cellClicked(id: number) {
  		console.log(id);
		console.log(SHA1("abc").toString());
	}

}
