import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouscontacterContainerComponent } from './nouscontacter-container.component';

describe('NouscontacterContainerComponent', () => {
  let component: NouscontacterContainerComponent;
  let fixture: ComponentFixture<NouscontacterContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NouscontacterContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NouscontacterContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
