import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BlockchainService } from './blockchain.service';

import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';


@NgModule({
  declarations: [
    AppComponent,
    GridComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [BlockchainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
