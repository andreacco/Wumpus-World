import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';


describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let compiled: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe tener un link al código en github', () => {
    const a = fixture.debugElement.nativeElement.querySelector('a');
    expect(a.textContent).toContain('Source code');
  });
  
});
