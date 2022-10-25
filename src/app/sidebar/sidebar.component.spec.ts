import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe tener una seccion de informacion', () => {
    const info = fixture.debugElement.nativeElement.querySelector('.first-line');
    expect(info.textContent).toBeDefined()
  });
  
  it('debe tener un span para la puntuacion', () => {
    const info = fixture.debugElement.nativeElement.querySelector('#score');
    expect(info.textContent).toBeDefined()
  });

  it('debe tener un span para la puntuacion', () => {
    const info = fixture.debugElement.nativeElement.querySelector('#arrow');
    expect(info.textContent).toBeDefined()
  });

  it('debe tener un span para la puntuacion', () => {
    const info = fixture.debugElement.nativeElement.querySelector('#gold');
    expect(info.textContent).toBeDefined()
  });
  
    it('debe tener un boton para volver a empezar', () => {
      const button = fixture.debugElement.nativeElement.querySelector('.restart-sidebar');
      expect(button.textContent).toBeDefined()
    });

  it('debe tener una seccion de controles', () => {
    const controles = fixture.debugElement.nativeElement.querySelector('.third-line');
    expect(controles.textContent).toBeDefined()
  });
  
  it('debe tener una imagen epecificando los controles del juego', () => {
    const controles = fixture.debugElement.nativeElement.querySelector('#controles');
    expect(controles.textContent).toBeDefined()
  });

});
