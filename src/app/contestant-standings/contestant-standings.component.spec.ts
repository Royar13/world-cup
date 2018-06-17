import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestantStandingsComponent } from './contestant-standings.component';

describe('ContestantsRankComponent', () => {
  let component: ContestantStandingsComponent;
  let fixture: ComponentFixture<ContestantStandingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContestantStandingsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestantStandingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
