import SHA3 = require('crypto-js/sha3');

export class GameBlock {
	winner: string;
	score: number;
	timeStamp: number;
	previousHash: string;
	hash: string;
	nonce: number;

	constructor(winner: string, score: number, timeStamp: number, previousHash = '') {
		this.winner = winner;
		this.score = score;
		this.timeStamp = timeStamp;
		this.previousHash = previousHash;
		this.nonce = 0;
		this.hash = this.calculateHash();
	}

	calculateHash() {
		return SHA3(
			this.winner +
			this.score.toString() +
			this.timeStamp.toString() +
			this.previousHash +
			this.nonce.toString()
		).toString()
	}

	mineBlock(difficulty: number, hashStartsWith: string) {
		while (this.hash.substring(0, difficulty) !== hashStartsWith) {
			++this.nonce;
			this.hash = this.calculateHash();
		}
	}
}