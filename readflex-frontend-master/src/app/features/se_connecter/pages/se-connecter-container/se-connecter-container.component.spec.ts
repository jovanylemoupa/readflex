import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeConnecterContainerComponent } from './se-connecter-container.component';

describe('SeConnecterContainerComponent', () => {
  let component: SeConnecterContainerComponent;
  let fixture: ComponentFixture<SeConnecterContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeConnecterContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeConnecterContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
