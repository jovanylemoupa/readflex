import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteplaceComponent } from './writeplace.component';

describe('WriteplaceComponent', () => {
  let component: WriteplaceComponent;
  let fixture: ComponentFixture<WriteplaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WriteplaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WriteplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
