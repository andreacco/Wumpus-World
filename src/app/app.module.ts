import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { GameComponent } from './game/game.component';
import { GameEnvService } from './game-env.service';

@NgModule({
  declarations: [
    AppComponent,
    // NavbarComponent,
    // SidebarComponent,
    // GameComponent
  ],
  imports: [
    BrowserModule,
    NavbarComponent,
    SidebarComponent,
    GameComponent
  ],
  providers: [GameEnvService],
  bootstrap: [AppComponent]
})
export class AppModule { }
