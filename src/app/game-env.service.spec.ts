import { TestBed } from '@angular/core/testing';

import { GameEnvService } from './game-env.service';

describe('GameEnvService', () => {
  let service: GameEnvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameEnvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
