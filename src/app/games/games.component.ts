import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { GameBlock } from '../gameblock';
import { BlockchainService } from '../blockchain.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.sass']
})
export class GamesComponent implements OnInit {
	displayedColumns = ['winner', 'score'];
	dataSource: any;

	constructor(private blockchainService: BlockchainService) {
		// first element of array is genesis block, do not populate that into table
		this.dataSource = this.blockchainService.games.slice(1);
	}

	ngOnInit() {

	}

}