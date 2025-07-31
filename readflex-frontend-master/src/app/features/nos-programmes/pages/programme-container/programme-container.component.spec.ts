import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammeContainerComponent } from './programme-container.component';

describe('ProgrammeContainerComponent', () => {
  let component: ProgrammeContainerComponent;
  let fixture: ComponentFixture<ProgrammeContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgrammeContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgrammeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
