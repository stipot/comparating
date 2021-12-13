import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisambComponent } from './disamb.component';

describe('DescriptionComponent', () => {
  let component: DisambComponent;
  let fixture: ComponentFixture<DisambComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisambComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisambComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
