import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeroBannerComponent } from '../../../../shared/component/hero-banner/hero-banner.component';
import { StoryService } from '../../../../shared/services/story/story.service';
import { Story } from '../../../../shared/models/story';
import { CardStoryComponent } from '../../../../shared/component/card-story/card-story.component';
import { StoryCategories } from '../../../../shared/models/story-categories.enum';

interface CategoryInfo {
  name: string;
  displayName: string;
  icon: string;
}

@Component({
  selector: 'app-home-container',
  standalone: true,
  imports: [CommonModule, FormsModule, HeroBannerComponent, CardStoryComponent],
  templateUrl: './home-container.component.html',
  styleUrl: './home-container.component.scss',
})
export class HomeContainerComponent implements OnInit {
  @ViewChild('fantastiqueCarousel') fantastiqueCarousel!: ElementRef;
  @ViewChild('legendeCarousel') legendeCarousel!: ElementRef;

  // Données principales
  stories: Story[] = [];
  filteredStories: Story[] = [];
  featuredStories: Story[] = [];

  // Paramètres de recherche et tri
  searchTerm: string = '';
  sortBy: string = 'date';

  // Statistiques utilisateur
  totalStoriesRead: number = 0;
  totalTimeRead: string = '0h';
  favoriteGenre: string = '';
  currentStreak: number = 0;

  // Configuration des catégories
  categories: CategoryInfo[] = [
    { name: 'Fantastique', displayName: 'Fantastique', icon: '🧙‍♂️' },
    { name: 'ContesLegendes', displayName: 'Contes & Légendes', icon: '🏰' },
    { name: 'ScienceFiction', displayName: 'Science-Fiction', icon: '🚀' },
    { name: 'HistoireAmour', displayName: "Histoire d'Amour", icon: '💕' },
    { name: 'Historique', displayName: 'Historique', icon: '📜' },
    { name: 'AventuresEpiques', displayName: 'Aventures Épiques', icon: '⚔️' },
    { name: 'Comedie', displayName: 'Comédie', icon: '😂' },
    { name: 'Inspiration', displayName: 'Inspiration', icon: '✨' },
  ];

  constructor(private storyService: StoryService) {}

  ngOnInit(): void {
    this.initializeData();
  }

  /**
   * Initialise toutes les données du composant
   */
  private initializeData(): void {
    this.loadStories();
    this.loadUserStats();
    this.setFeaturedStories();
  }

  /**
   * Charge toutes les histoires depuis le service
   */
  private loadStories(): void {
    this.stories = this.storyService.getStoriesOverview() || [];
    this.filteredStories = [...this.stories];
    console.log('Histoires chargées:', this.stories.length);
  }

  /**
   * Définit les histoires mises en vedette
   */
  private setFeaturedStories(): void {
    // Sélectionne les 6 premières histoires les mieux notées ou les plus populaires
    this.featuredStories = this.stories
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 6);
  }

  /**
   * Charge les statistiques de l'utilisateur
   * (Dans une vraie app, ceci viendrait d'un service)
   */
  private loadUserStats(): void {
    // Simulation des données utilisateur
    this.totalStoriesRead = this.calculateStoriesRead();
    this.totalTimeRead = this.calculateTimeRead();
    this.favoriteGenre = this.calculateFavoriteGenre();
    this.currentStreak = this.calculateCurrentStreak();
  }

  /**
   * Calcule le nombre d'histoires lues
   */
  private calculateStoriesRead(): number {
    return Math.floor(Math.random() * 50) + 10;
  }

  /**
   * Calcule le temps total de lecture
   */
  private calculateTimeRead(): string {
    const hours = Math.floor(Math.random() * 200) + 20;
    return `${hours}h`;
  }

  /**
   * Détermine le genre favori de l'utilisateur
   */
  private calculateFavoriteGenre(): string {
    if (this.stories.length === 0) return 'Fantastique';

    const genreCounts = this.stories.reduce((acc, story) => {
      const genreName = this.getGenreDisplayName(story.categorie);
      acc[genreName] = (acc[genreName] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.keys(genreCounts).reduce((a, b) =>
      genreCounts[a] > genreCounts[b] ? a : b
    );
  }

  /**
   * Obtient le nom d'affichage du genre à partir de l'enum
   */
  private getGenreDisplayName(category: any): string {
    const categoryMap: { [key: string]: string } = {
      [StoryCategories.Fantastique]: 'Fantastique',
      [StoryCategories.ContesLegendes]: 'Contes & Légendes',
      [StoryCategories.ScienceFiction]: 'Science-Fiction',
      [StoryCategories.HistoireAmour]: "Histoire d'Amour",
      [StoryCategories.Historique]: 'Historique',
      [StoryCategories.AventuresEpiques]: 'Aventures Épiques',
      [StoryCategories.Comedie]: 'Comédie',
      [StoryCategories.Inspiration]: 'Inspiration',
    };
    return categoryMap[category] || 'Inconnu';
  }

  /**
   * Calcule la série de jours consécutifs de lecture
   */
  private calculateCurrentStreak(): number {
    return Math.floor(Math.random() * 30) + 1;
  }

  /**
   * Recherche les histoires en fonction du terme de recherche
   */
  onSearchChange(): void {
    if (!this.searchTerm.trim()) {
      this.filteredStories = [...this.stories];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredStories = this.stories.filter(
      (story) =>
        story.titre.toLowerCase().includes(term) ||
        story.author?.toLowerCase().includes(term) ||
        story.categorie.toLowerCase().includes(term) ||
        story.description?.toLowerCase().includes(term)
    );
  }

  /**
   * Change l'ordre de tri des histoires
   */
  onSortChange(): void {
    switch (this.sortBy) {
      case 'date':
        this.filteredStories.sort(
          (a, b) =>
            new Date(b.datePublished || 0).getTime() -
            new Date(a.datePublished || 0).getTime()
        );
        break;
      case 'popularity':
        this.filteredStories.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case 'rating':
        this.filteredStories.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        break;
    }
  }

  /**
   * Filtre les histoires par catégorie
   */
  filterByCategory(categoryName: string): void {
    // Mapping des noms de catégories vers les valeurs de l'enum
    const categoryMapping: { [key: string]: any } = {
      Fantastique: StoryCategories.Fantastique,
      ContesLegendes: StoryCategories.ContesLegendes,
      ScienceFiction: StoryCategories.ScienceFiction,
      HistoireAmour: StoryCategories.HistoireAmour,
      Historique: StoryCategories.Historique,
      AventuresEpiques: StoryCategories.AventuresEpiques,
      Comedie: StoryCategories.Comedie,
      Inspiration: StoryCategories.Inspiration,
    };

    const enumValue = categoryMapping[categoryName];
    this.filteredStories = this.stories.filter(
      (story) => story.categorie === enumValue
    );

    // Optionnel: faire défiler vers la section des résultats
    this.scrollToResults();
  }

  /**
   * Obtient les histoires d'une catégorie spécifique
   */
  getStoriesByCategory(category: string): Story[] {
    // Mapping des noms de catégories vers les valeurs de l'enum
    const categoryMapping: { [key: string]: any } = {
      Fantastique: StoryCategories.Fantastique,
      ContesLegendes: StoryCategories.ContesLegendes,
      ScienceFiction: StoryCategories.ScienceFiction,
      HistoireAmour: StoryCategories.HistoireAmour,
      Historique: StoryCategories.Historique,
      AventuresEpiques: StoryCategories.AventuresEpiques,
      Comedie: StoryCategories.Comedie,
      Inspiration: StoryCategories.Inspiration,
    };

    const enumValue = categoryMapping[category];
    return this.stories.filter((story) => story.categorie === enumValue);
  }

  /**
   * Obtient le nombre d'histoires par catégorie
   */
  getStoriesCountByCategory(categoryName: string): number {
    // Mapping des noms de catégories vers les valeurs de l'enum
    const categoryMapping: { [key: string]: any } = {
      Fantastique: StoryCategories.Fantastique,
      ContesLegendes: StoryCategories.ContesLegendes,
      ScienceFiction: StoryCategories.ScienceFiction,
      HistoireAmour: StoryCategories.HistoireAmour,
      Historique: StoryCategories.Historique,
      AventuresEpiques: StoryCategories.AventuresEpiques,
      Comedie: StoryCategories.Comedie,
      Inspiration: StoryCategories.Inspiration,
    };

    const enumValue = categoryMapping[categoryName];
    return this.stories.filter((story) => story.categorie === enumValue).length;
  }

  /**
   * Obtient les nouvelles histoires (les plus récentes)
   */
  getNewStories(): Story[] {
    return this.filteredStories
      .sort(
        (a, b) =>
          new Date(b.datePublished || 0).getTime() -
          new Date(a.datePublished || 0).getTime()
      )
      .slice(0, 8);
  }

  /**
   * Fait défiler le carrousel vers la gauche
   */
  scrollLeft(carouselType: string): void {
    const carousel = this.getCarouselElement(carouselType);
    if (carousel) {
      carousel.scrollBy({ left: -300, behavior: 'smooth' });
    }
  }

  /**
   * Fait défiler le carrousel vers la droite
   */
  scrollRight(carouselType: string): void {
    const carousel = this.getCarouselElement(carouselType);
    if (carousel) {
      carousel.scrollBy({ left: 300, behavior: 'smooth' });
    }
  }

  /**
   * Obtient l'élément du carrousel selon le type
   */
  private getCarouselElement(carouselType: string): HTMLElement | null {
    switch (carouselType) {
      case 'fantastique':
        return this.fantastiqueCarousel?.nativeElement;
      case 'legende':
        return this.legendeCarousel?.nativeElement;
      default:
        return null;
    }
  }

  /**
   * Fait défiler vers la section des résultats
   */
  private scrollToResults(): void {
    const element = document.querySelector('.new-stories-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  /**
   * Réinitialise tous les filtres
   */
  resetFilters(): void {
    this.searchTerm = '';
    this.sortBy = 'date';
    this.filteredStories = [...this.stories];
  }

  /**
   * Obtient une histoire aléatoire pour suggestion
   */
  getRandomStory(): Story | null {
    if (this.stories.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * this.stories.length);
    return this.stories[randomIndex];
  }

  /**
   * Vérifie si une catégorie a des histoires
   */
  categoryHasStories(categoryName: string): boolean {
    return this.getStoriesCountByCategory(categoryName) > 0;
  }
}
