import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { DisambComponent } from './disamb.component';

describe('DisambComponent', () => {
  let component: DisambComponent;
  let fixture: ComponentFixture<DisambComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisambComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    providers: [DisambComponent]
  });
 });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisambComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('DisambComponentshould create', () => {
    expect(component).toBeTruthy();
  });

});
