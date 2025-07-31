import { AfterViewInit, Directive, ElementRef, Inject, Input} from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SwiperOptions } from 'swiper/types';

@Directive({
  selector: '[appHeroSwiper]',
  standalone : true
})
export class HeroSwiperDirective implements AfterViewInit{

  private readonly swiperElement : HTMLElement;

  @Input('config') config : SwiperOptions = {};

  constructor(
    private el: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) private platformId: Object
    ) {
    this.swiperElement = el.nativeElement;
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)){

      const swiper =  Object.assign(this.swiperElement, this.config);
      // @ts-ignore
      this.swiperElement.initialize();
    }
  }

}

