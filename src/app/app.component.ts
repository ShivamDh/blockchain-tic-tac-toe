import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent {
  title = 'Blockchain Tic-Tac-Toe';
  titleHeader = 'Welcome to ' + this.title + '!';
}
