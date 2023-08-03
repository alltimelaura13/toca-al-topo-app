import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopoComponent } from './topo.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('TopoComponent', () => {
  let component: TopoComponent;
  let fixture: ComponentFixture<TopoComponent>;
  let startButton: DebugElement;

  fixture = TestBed.createComponent(TopoComponent);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  startButton = fixture.debugElement.query(By.css("startButton"));

});
