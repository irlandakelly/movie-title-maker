import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDisplayCardComponent } from './data-display-card.component';

describe('DataDisplayCardComponent', () => {
  let component: DataDisplayCardComponent;
  let fixture: ComponentFixture<DataDisplayCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataDisplayCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataDisplayCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
