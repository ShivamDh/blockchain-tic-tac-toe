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
        this.checkChainValidity();

  		let newBlock = new GameBlock(
  			winner,
  			gameScore,
  			gameEndTime,
  			this.getLastBlock().hash
  		);

  		newBlock.mineBlock(this.difficulty, this.hashBeginsWith);

  		this.games.push(newBlock);
  	}

    checkChainValidity() {
        for (let i = 1; i < this.games.length; i++){

            // block hash does not correspond to the data within it
            if (this.chain[i].hash !== this.chain[i].calculateHash()) {
                return false;
            }

            // block's previous hash does not match with chain 
            if (this.chain[i].previousHash !== this.chain[i-1].hash) {
                return false;
            }
        }

        return true;
    }

}
