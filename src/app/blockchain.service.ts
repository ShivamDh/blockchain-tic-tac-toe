import { Injectable } from '@angular/core';

import { GameBlock } from './gameblock';

@Injectable()
export class BlockchainService {
	games: GameBlock[] = [];
	difficulty: number;
	hashBeginsWith: string;

  	constructor() {
  		this.games = [this.createGenesisBlock()];
  		this.difficulty = 2;
  		this.hashBeginsWith = Array(this.difficulty + 1).join("0");
  	}

  	createGenesisBlock() {
  		return new GameBlock('None', 0, Date.now());
  	}

  	getLastBlock() {
  		return this.games[this.games.length - 1]
  	}

  	addGameResult(winner: string, gameScore: number, gameEndTime: number) {
  		let newBlock = new GameBlock(
  			winner,
  			gameScore,
  			gameEndTime,
  			this.getLastBlock().hash
  		);

  		newBlock.mineBlock(this.difficulty, this.hashBeginsWith);

  		this.games.push(newBlock);
  	}

}
