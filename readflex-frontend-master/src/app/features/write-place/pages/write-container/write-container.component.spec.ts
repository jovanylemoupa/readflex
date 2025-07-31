import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteContainerComponent } from './write-container.component';

describe('WriteContainerComponent', () => {
  let component: WriteContainerComponent;
  let fixture: ComponentFixture<WriteContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WriteContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WriteContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
