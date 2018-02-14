import { Component, ViewChild } from '@angular/core';
import { NgIf } from '@angular/common';
import * as CryptoJS from 'crypto-js';

import { GridComponent } from './grid/grid.component'
import { GamesComponent } from './games/games.component'

import * as pusherCred from '../../pusherCredentials.js';

declare const Pusher: any;

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
	canPlay: boolean = true;
	player: number = 0;
	players: number = 0;

	pusherChannel: any;
	gameId: string;

	@ViewChild(GridComponent)
	private grid: GridComponent;

	@ViewChild(GamesComponent)
	private games: GamesComponent;

	constructor() {
		this.title = 'Blockchain Tic-Tac-Toe';
		this.titleHeader = 'Welcome to ' + this.title + '!';
		this.gameOver = false;
		this.resetButtonString = 'Reset Game';

		this.initalizePusher();
	}

	receiveNewState($event) {
		this.gameOver = $event;
		this.games.update();
	}

	resetGame() {
		this.gameOver = false;
		this.grid.clear();
	}

	// initalizes the Pusher object from the API
	// subscribes to standard Pusher requests for member changes and subscription
	initalizePusher() {
		let id = this.getQueryParameter('id');
		if (!id) {
			id = this.getUniqueId();
			location.search = location.search ? '&id=' + id : 'id=' + id;
		}
		this.gameId = id;

		const pusher = new Pusher(pusherCred.key, {
			authEndpoint: './pusher/auth',
			cluster: 'us2',
			disableStats: true
		});

		this.pusherChannel = pusher.subscribe(this.gameId);

		this.pusherChannel.bind('pusher:member_added', () => {
			++this.players;
		});

		this.pusherChannel.bind('pusher:subscription_succeeded', (members) => {
			this.players = members.count;
			this.setPlayer(this.players);
		});

		this.pusherChannel.bind('pusher:member_removed', () => {
			--this.players;
		});
	}

	// set player number
	setPlayer(players:number = 1) {
        this.player = players - 1;
        if (players == 2) {
          this.canPlay = true;
        } else if (players > 2) {
          this.canPlay = false;
        }
      }

	getQueryParameter(param) : string {
		var match = RegExp('[?&]' + param + '=([^&]*)').exec(location.search);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
	}

	// used to come up with a new game id every time
	getUniqueId() : any {
		return 'presence-' + CryptoJS.SHA1(Math.random().toString()).toString()
	}
}
