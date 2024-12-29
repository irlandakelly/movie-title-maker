import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtworkPaneComponent } from './artwork-pane.component';

describe('ArtworkPaneComponent', () => {
  let component: ArtworkPaneComponent;
  let fixture: ComponentFixture<ArtworkPaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtworkPaneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtworkPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
