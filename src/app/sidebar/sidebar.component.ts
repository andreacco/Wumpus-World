import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  restart() {
    console.log("you restarted the game")
      // wumpusWorld = new World(roomsPerRow);
      // flies_sound.stop();
      // wind_sound.forEach(sound => {
      //     sound.stop();
      // });
      // victory_sound.stop();
      // defeat_sound.stop();
  }

}
