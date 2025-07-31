import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAnalystics } from './page-analystics';

describe('PageAnalystics', () => {
  let component: PageAnalystics;
  let fixture: ComponentFixture<PageAnalystics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageAnalystics]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageAnalystics);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
