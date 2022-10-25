import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe tener una función para empezar el juego', () => {
    expect(component.empezarJuego).toBeTruthy()
  })
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });


});
