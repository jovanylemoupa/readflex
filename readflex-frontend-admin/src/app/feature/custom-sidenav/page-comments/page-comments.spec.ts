import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageComments } from './page-comments';

describe('PageComments', () => {
  let component: PageComments;
  let fixture: ComponentFixture<PageComments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageComments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageComments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
