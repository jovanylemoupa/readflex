import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { ActivationEnd, NavigationEnd, Router } from '@angular/router';

@Directive({
  selector: '[appScrollHeader]',
  standalone: true
})
export class ScrollHeaderDirective implements OnInit {

  backgroundedHeader !: boolean;

  constructor(
    private header : ElementRef,
    private renderer: Renderer2,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.onRoutingEvent();
  }

  //On routing event we, if we are on small screen, we toggle the menu to disapear from the screen after we click on a link
  onRoutingEvent() : void {
    this.router.events.subscribe({
      next : (event) => {
        if(event instanceof ActivationEnd){
          console.log(event)
          if(event.snapshot.component){
            this.backgroundedHeader = event.snapshot.data["backgrounded"]
            if(this.backgroundedHeader){
              this.renderer.addClass(this.header.nativeElement, 'navbar-background-on-scroll');
            }else{
              this.renderer.removeClass(this.header.nativeElement, 'navbar-background-on-scroll');
            }
          }
        }
      }
    })
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY || window.pageYOffset;

    if(this.backgroundedHeader){
      this.renderer.addClass(this.header.nativeElement, 'navbar-background-on-scroll');
    }
    else{
      if (scrollY > this.header.nativeElement?.clientHeight) {
        // Add the CSS class 'headerCss' when scrolling
        this.renderer.addClass(this.header.nativeElement, 'navbar-background-on-scroll');
      } else {
        // Remove the CSS class 'headerCss' when not scrolling
        this.renderer.removeClass(this.header.nativeElement, 'navbar-background-on-scroll');
      }
    } 
  }
}
