import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageVideos } from './page-videos';

describe('PageVideos', () => {
  let component: PageVideos;
  let fixture: ComponentFixture<PageVideos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageVideos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageVideos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
