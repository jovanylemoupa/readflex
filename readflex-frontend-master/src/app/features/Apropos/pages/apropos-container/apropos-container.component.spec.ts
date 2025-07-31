import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AproposContainerComponent } from './apropos-container.component';

describe('AproposContainerComponent', () => {
  let component: AproposContainerComponent;
  let fixture: ComponentFixture<AproposContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AproposContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AproposContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
