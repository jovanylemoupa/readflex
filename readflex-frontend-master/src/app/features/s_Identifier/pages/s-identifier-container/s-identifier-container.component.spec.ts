import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SIdentifierContainerComponent } from './s-identifier-container.component';

describe('SIdentifierContainerComponent', () => {
  let component: SIdentifierContainerComponent;
  let fixture: ComponentFixture<SIdentifierContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SIdentifierContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SIdentifierContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
