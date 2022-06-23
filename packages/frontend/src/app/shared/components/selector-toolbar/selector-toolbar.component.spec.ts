import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorToolbarComponent } from './selector-toolbar.component';

describe('SelectorToolbarComponent', () => {
  let component: SelectorToolbarComponent;
  let fixture: ComponentFixture<SelectorToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectorToolbarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
