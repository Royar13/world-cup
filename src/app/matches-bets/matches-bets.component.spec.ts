import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchesBetsComponent } from './matches-bets.component';

describe('MatchesBetsComponent', () => {
  let component: MatchesBetsComponent;
  let fixture: ComponentFixture<MatchesBetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchesBetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchesBetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
