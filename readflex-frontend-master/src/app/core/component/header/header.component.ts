// HEADERCOMPONENT CORRIGÉ POUR VOTRE TEMPLATE EXISTANT

import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  Renderer2,
  ViewChild,
  PLATFORM_ID,
} from '@angular/core';
import {
  ActivationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { NgClass } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

import { NavSmallScreenComponent } from '../nav-small-screen/nav-small-screen.component';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { MultilangService } from '../../../shared/services/MultiLang/multilang.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass, NavSmallScreenComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  isConnected!: boolean;
  title = 'ReadFlex';
  @ViewChild('header') header!: ElementRef<HTMLElement>;

  multiLangService = inject(MultilangService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  isNotYetImplemented!: Boolean;
  visibleSidebar!: boolean;
  displayMenu: boolean = false;
  isHeaderBackgrounded!: boolean;
  onLive = true;

  // Variables pour gérer le scroll
  private lastScrollTop = 0;
  private scrollThreshold = 20;
  private isHeaderVisible = true;
  private scrollCount = 0;
  private maxScrollsBeforeHide = 2;
  private lastScrollTime = 0;
  private scrollDebounceTime = 100;

  constructor(
    private _renderer: Renderer2,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.onRoutingEvent();
    this.getUserState();
  }

  // MÉTHODE SIMPLE POUR VOTRE TEMPLATE
  toggleToOtherLanguage(): void {
    const currentLang = this.multiLangService.languageSignal();
    const newLang = currentLang === 'gb' ? 'fr' : 'gb';
    this.multiLangService.updateLanguage(newLang);
    console.log('Language changed to:', newLang);
  }

  onRoutingEvent(): void {
    this.router.events.subscribe({
      next: (event) => {
        if (event instanceof ActivationEnd) {
          if (event.snapshot.component) {
            this.isHeaderBackgrounded =
              event.snapshot.data['isHeaderBackgrounded'];

            if (this.isHeaderBackgrounded) {
              this._renderer.addClass(
                this.header.nativeElement,
                'navbar-background-on-scroll'
              );
            } else {
              this._renderer.removeClass(
                this.header.nativeElement,
                'navbar-background-on-scroll'
              );
            }
          }
        }
      },
    });
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    const currentScrollTop =
      window.pageYOffset || document.documentElement.scrollTop;

    if (this.isHeaderBackgrounded) {
      this._renderer.addClass(
        this.header.nativeElement,
        'navbar-background-on-scroll'
      );
    } else {
      if (currentScrollTop > this.header.nativeElement?.clientHeight) {
        this._renderer.addClass(
          this.header.nativeElement,
          'navbar-background-on-scroll'
        );
      } else {
        this._renderer.removeClass(
          this.header.nativeElement,
          'navbar-background-on-scroll'
        );
      }
    }

    this.handleScrollCounting(currentScrollTop);
    this.lastScrollTop = currentScrollTop;
  }

  private handleScrollCounting(currentScrollTop: number): void {
    const currentTime = Date.now();

    if (currentScrollTop <= this.scrollThreshold) {
      this.scrollCount = 0;
      this.showHeader();
      console.log('🔄 Compteur remis à 0 (en haut de page)');
      return;
    }

    const scrollDifference = currentScrollTop - this.lastScrollTop;

    if (
      scrollDifference > 50 &&
      currentTime - this.lastScrollTime > this.scrollDebounceTime
    ) {
      this.scrollCount++;
      this.lastScrollTime = currentTime;

      console.log(
        `📱 Scroll vers le bas ${this.scrollCount}/${this.maxScrollsBeforeHide}`
      );

      if (
        this.scrollCount >= this.maxScrollsBeforeHide &&
        this.isHeaderVisible
      ) {
        this.hideHeader();
        console.log('🫥 Header caché !');
      }
    } else if (scrollDifference < -50 && !this.isHeaderVisible) {
      this.showHeader();
      this.scrollCount = Math.max(0, this.scrollCount - 2);
      console.log(
        `📱 Scroll vers le haut - Compteur: ${this.scrollCount}/${this.maxScrollsBeforeHide}`
      );
    }
  }

  private showHeader(): void {
    if (!this.isHeaderVisible) {
      this._renderer.removeClass(this.header.nativeElement, 'header-hidden');
      this._renderer.addClass(this.header.nativeElement, 'header-visible');
      this.isHeaderVisible = true;
    }
  }

  private hideHeader(): void {
    if (this.isHeaderVisible && !this.displayMenu) {
      this._renderer.removeClass(this.header.nativeElement, 'header-visible');
      this._renderer.addClass(this.header.nativeElement, 'header-hidden');
      this.isHeaderVisible = false;
    }
  }

  onBurgerMenu() {
    if (this.displayMenu === false) {
      this.showHeader();

      if (window.pageYOffset <= this.header.nativeElement.clientHeight) {
        this._renderer.addClass(
          this.header.nativeElement,
          'navbar-background-on-scroll'
        );
      }
    } else {
      if (!this.isHeaderBackgrounded) {
        if (window.pageYOffset <= this.header.nativeElement.clientHeight) {
          this._renderer.removeClass(
            this.header.nativeElement,
            'navbar-background-on-scroll'
          );
        }
      }
    }

    this.displayMenu = !this.displayMenu;
  }

  menuForSmallScreenHandler(value: boolean) {
    this.displayMenu = value;

    if (!value) {
      this.scrollCount = 0;
      this.showHeader();
    }
  }

  getUserState() {
    this.authService.isUserLogged$.subscribe({
      next: (res: any) => {
        this.isConnected = res;
      },
    });
  }

  onLoginOut() {
    this.authService.isUserLogged$.next(false);
    // CORRECTION SSR pour localStorage
    if (
      this.isBrowser &&
      typeof window !== 'undefined' &&
      window.localStorage
    ) {
      localStorage.removeItem('isUserLogged');
    }
  }

  getInitials(fullName: string): string {
    if (!fullName) return '';
    const names = fullName.trim().split(' ');
    const first = names[0]?.charAt(0) || '';
    const last = names.length > 1 ? names[names.length - 1].charAt(0) : '';
    return (first + last).toUpperCase();
  }
}
