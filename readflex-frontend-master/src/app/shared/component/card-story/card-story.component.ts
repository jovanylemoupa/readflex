import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { AvatarModule } from 'primeng/avatar';
import { NgOptimizedImage, NgIf } from '@angular/common';
import { StoryService } from '../../services/story/story.service';
import { Story } from '../../models/story';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-card-story',
  standalone: true,
  imports: [DialogModule, ButtonModule, AvatarModule, NgOptimizedImage, NgIf],
  templateUrl: './card-story.component.html',
  styleUrl: './card-story.component.scss',
})
export class CardStoryComponent implements OnInit, OnDestroy {
  @Input() story!: Story;

  // États de base
  isConnected: boolean = false;
  isFavorited: boolean = false;
  visible: boolean = false;

  // Contrôles de lecture
  fontSize: number = 16;
  isDarkMode: boolean = false;

  // Constantes pour la taille de police
  private readonly MIN_FONT_SIZE = 12;
  private readonly MAX_FONT_SIZE = 24;
  private readonly FONT_SIZE_STEP = 2;

  // Subject pour la gestion des subscriptions
  private destroy$ = new Subject<void>();

  constructor(
    private storyService: StoryService,
    private authService: AuthService,
    private router: Router
  ) {
    // Charger les préférences sauvegardées
    this.loadUserPreferences();
  }

  ngOnInit(): void {
    this.getUserState();
    this.loadFavoriteStatus();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Récupération du nom complet de l'auteur
   */
  getAuthorName(): string {
    if (!this.story?.auteur) {
      return 'Auteur inconnu';
    }

    // Si l'auteur est déjà un string (cas ancien)
    if (typeof this.story.auteur === 'string') {
      return this.story.auteur;
    }

    // Si l'auteur est un objet, construire le nom complet
    const auteur = this.story.auteur as any;
    const prenom = auteur.prenom || auteur.firstName || '';
    const nom = auteur.nom || auteur.lastName || auteur.name || '';

    return `${prenom} ${nom}`.trim() || 'Auteur inconnu';
  }

  /**
   * Gestion des raccourcis clavier
   */
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (!this.visible) return;

    switch (event.key) {
      case 'Escape':
        this.closeDialog();
        event.preventDefault();
        break;
      case '+':
        if (event.ctrlKey) {
          this.increaseFontSize();
          event.preventDefault();
        }
        break;
      case '-':
        if (event.ctrlKey) {
          this.decreaseFontSize();
          event.preventDefault();
        }
        break;
      case 'd':
        if (event.ctrlKey) {
          this.toggleDarkMode();
          event.preventDefault();
        }
        break;
    }
  }

  /**
   * Gestion de l'état de connexion utilisateur
   */
  getUserState(): void {
    this.authService.isUserLogged$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (isLogged: boolean) => {
        this.isConnected = isLogged;
      },
      error: (error) => {
        console.error(
          "Erreur lors de la récupération de l'état utilisateur:",
          error
        );
      },
    });
  }

  /**
   * Vérification si l'utilisateur est connecté
   */
  isUserLoggedIn(): boolean {
    return (
      this.authService.isUserLogged$.value ||
      localStorage.getItem('isUserLogged') === 'true'
    );
  }

  /**
   * Gestion de l'ouverture du dialog avec vérification de connexion
   */
  onShowDialog(): void {
    if (this.isUserLoggedIn()) {
      this.showDialog();
    } else {
      this.router.navigateByUrl('/se-connecter');
    }
  }

  /**
   * Affichage du dialog
   */
  showDialog(): void {
    this.visible = true;
    // Sauvegarder l'état de lecture
    this.saveReadingProgress();
  }

  /**
   * Fermeture du dialog
   */
  closeDialog(): void {
    this.visible = false;
    this.saveUserPreferences();
  }

  /**
   * Gestion des favoris avec persistance
   */
  toggleFavorite(): void {
    if (!this.isUserLoggedIn()) {
      this.router.navigateByUrl('/se-connecter');
      return;
    }

    this.isFavorited = !this.isFavorited;
    this.saveFavoriteStatus();

    // Ici vous pouvez ajouter un appel API pour sauvegarder en base
    // this.storyService.toggleFavorite(this.story.id, this.isFavorited);
  }

  /**
   * Augmentation de la taille de police
   */
  increaseFontSize(): void {
    if (this.fontSize < this.MAX_FONT_SIZE) {
      this.fontSize += this.FONT_SIZE_STEP;
      this.saveUserPreferences();
    }
  }

  /**
   * Diminution de la taille de police
   */
  decreaseFontSize(): void {
    if (this.fontSize > this.MIN_FONT_SIZE) {
      this.fontSize -= this.FONT_SIZE_STEP;
      this.saveUserPreferences();
    }
  }

  /**
   * Basculement du mode sombre
   */
  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.saveUserPreferences();
  }

  /**
   * Partage de l'histoire
   */
  shareStory(): void {
    if (navigator.share) {
      // API Web Share (mobile)
      navigator
        .share({
          title: `Histoire de ${this.getAuthorName()}`,
          text: this.story.description,
          url: window.location.href,
        })
        .catch((error) => {
          console.log('Erreur lors du partage:', error);
          this.fallbackShare();
        });
    } else {
      this.fallbackShare();
    }
  }

  /**
   * Partage alternatif (copie du lien)
   */
  private fallbackShare(): void {
    const textArea = document.createElement('textarea');
    textArea.value = `Découvrez cette histoire de ${this.getAuthorName()}: ${
      window.location.href
    }`;
    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand('copy');
      // Vous pouvez ajouter une notification de succès ici
      console.log('Lien copié dans le presse-papiers');
    } catch (error) {
      console.error('Erreur lors de la copie:', error);
    } finally {
      document.body.removeChild(textArea);
    }
  }

  /**
   * Sauvegarde des préférences utilisateur
   */
  private saveUserPreferences(): void {
    const preferences = {
      fontSize: this.fontSize,
      isDarkMode: this.isDarkMode,
    };
    localStorage.setItem('storyReaderPreferences', JSON.stringify(preferences));
  }

  /**
   * Chargement des préférences utilisateur
   */
  private loadUserPreferences(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem('storyReaderPreferences');
      if (saved) {
        try {
          const preferences = JSON.parse(saved);
          this.fontSize = preferences.fontSize || 16;
          this.isDarkMode = preferences.isDarkMode || false;
        } catch (error) {
          console.error('Erreur lors du chargement des préférences:', error);
        }
      }
    } else {
      console.warn(
        'localStorage non disponible (probablement hors navigateur)'
      );
    }
  }

  /**
   * Sauvegarde du statut favori
   */
  private saveFavoriteStatus(): void {
    const favorites = this.getFavorites();
    if (this.isFavorited) {
      favorites.add(this.story.id?.toString() || '');
    } else {
      favorites.delete(this.story.id?.toString() || '');
    }
    localStorage.setItem('favoriteStories', JSON.stringify([...favorites]));
  }

  /**
   * Chargement du statut favori
   */
  private loadFavoriteStatus(): void {
    const favorites = this.getFavorites();
    this.isFavorited = favorites.has(this.story.id?.toString() || '');
  }

  /**
   * Récupération de la liste des favoris
   */
  private getFavorites(): Set<string> {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem('favoriteStories');
      if (saved) {
        try {
          return new Set(JSON.parse(saved));
        } catch (error) {
          console.error('Erreur lors du chargement des favoris:', error);
        }
      }
    } else {
      console.warn(
        'localStorage non disponible (probablement hors navigateur)'
      );
    }
    return new Set();
  }

  /**
   * Sauvegarde du progrès de lecture
   */
  private saveReadingProgress(): void {
    const progress = {
      storyId: this.story.id,
      timestamp: new Date().toISOString(),
      completed: false,
    };

    const readingHistory = this.getReadingHistory();
    readingHistory.set(this.story.id?.toString() || '', progress);

    localStorage.setItem(
      'readingHistory',
      JSON.stringify([...readingHistory.entries()])
    );
  }

  /**
   * Récupération de l'historique de lecture
   */
  private getReadingHistory(): Map<string, any> {
    const saved = localStorage.getItem('readingHistory');
    if (saved) {
      try {
        return new Map(JSON.parse(saved));
      } catch (error) {
        console.error("Erreur lors du chargement de l'historique:", error);
      }
    }
    return new Map();
  }

  /**
   * Marquage de l'histoire comme lue
   */
  markAsRead(): void {
    const progress = {
      storyId: this.story.id,
      timestamp: new Date().toISOString(),
      completed: true,
    };

    const readingHistory = this.getReadingHistory();
    readingHistory.set(this.story.id?.toString() || '', progress);

    localStorage.setItem(
      'readingHistory',
      JSON.stringify([...readingHistory.entries()])
    );
  }
}
