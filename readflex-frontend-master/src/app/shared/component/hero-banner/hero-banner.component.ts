import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { HeroService } from '../../services/heroservives/heroService';
import { HeroInfo } from '../../models/heroInfo';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-hero-banner',
  standalone: true,
  imports: [CarouselModule, NgOptimizedImage],
  templateUrl: './hero-banner.component.html',
  styleUrl: './hero-banner.component.scss',
})
export class HeroBannerComponent implements OnInit {
  heroCards!: HeroInfo[];

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.heroCards = this.heroService.getHeroBannerInfo();
  }
}
