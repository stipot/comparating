import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { DashboardsService } from '../dashboards.service';
import {DashboardsModule} from '../dashboards.module'
import { HttpClientModule } from '@angular/common/http';

import { SelectorComponent } from './selector.component';

describe('SelectorComponent', () => {
  let component: SelectorComponent;
  let fixture: ComponentFixture<SelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectorComponent]
    })
      .compileComponents();
  });
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, DashboardsModule],
      providers: [SelectorComponent, RouterTestingModule, DashboardsService]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
