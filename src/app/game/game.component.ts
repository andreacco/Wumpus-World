import { Component, OnInit } from '@angular/core';
import { GameEnvService } from '../game-env.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(private funcionalidadDelJuego: GameEnvService) { }

  ngOnInit(): void {
    this.empezarJuego()
  }

  empezarJuego(){
    console.log("empieza el juego");
    this.funcionalidadDelJuego.jugar()
  }

}
