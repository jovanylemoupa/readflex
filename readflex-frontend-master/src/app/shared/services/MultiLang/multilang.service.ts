import { effect, inject, Injectable, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class MultilangService {
  translateServise = inject(TranslateService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  languageSignal = signal<string>(this.getInitialLanguage());

  private getInitialLanguage(): string {
    if (
      this.isBrowser &&
      typeof window !== 'undefined' &&
      window.localStorage
    ) {
      try {
        const savedLanguage = window.localStorage.getItem('languageSignal');
        return savedLanguage ? JSON.parse(savedLanguage) : 'gb';
      } catch (error) {
        console.warn('Error reading language from localStorage:', error);
        return 'gb';
      }
    }
    return 'gb'; // Default for SSR
  }

  updateLanguage(language: string): void {
    this.languageSignal.update(() => {
      switch (language) {
        case 'gb':
        case 'en': // Support both 'gb' and 'en'
          return 'gb';
        case 'fr':
          return 'fr';
        default:
          return 'gb';
      }
    });
  }

  constructor() {
    effect(() => {
      // Sauvegarder seulement côté navigateur
      if (
        this.isBrowser &&
        typeof window !== 'undefined' &&
        window.localStorage
      ) {
        try {
          window.localStorage.setItem(
            'languageSignal',
            JSON.stringify(this.languageSignal())
          );
        } catch (error) {
          console.warn('Error saving language to localStorage:', error);
        }
      }

      // Utiliser le service de traduction
      this.translateServise.use(this.languageSignal());
      console.log('Current language:', this.languageSignal());
    });
  }
}
