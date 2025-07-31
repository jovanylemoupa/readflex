import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { StoryService } from '../../../../shared/services/story/story.service';
import { Story } from '../../../../shared/models/story';
import { StoryCategories } from '../../../../shared/models/story-categories.enum';

interface CategoryOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-programme-container',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './programme-container.component.html',
  styleUrl: './programme-container.component.scss',
  animations: [
    trigger('slideToggle', [
      state(
        'collapsed',
        style({
          height: '0px',
          opacity: 0,
          overflow: 'hidden',
        })
      ),
      state(
        'expanded',
        style({
          height: '*',
          opacity: 1,
          overflow: 'visible',
        })
      ),
      transition('collapsed <=> expanded', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class ProgrammeContainerComponent implements OnInit {
  // Données
  allPrograms: Story[] = [];
  filteredPrograms: Story[] = [];
  paginatedPrograms: Story[] = [];

  // Configuration
  itemsPerPage = 12;
  currentPage = 1;
  viewMode: 'grid' | 'list' = 'grid';
  isLoading = false;

  // Recherche et filtres
  searchQuery = '';
  selectedCategory = '';
  selectedAuthor = '';
  selectedRating = '';
  sortBy = 'popularity';

  // Filtres avancés
  showAdvancedFilters = false;
  durationMin: number | null = null;
  durationMax: number | null = null;
  selectedTags: string[] = [];
  showCompleted = true;
  showInProgress = true;

  // Options
  categories: CategoryOption[] = [];
  authors: string[] = [];
  availableTags: string[] = [
    'Aventure',
    'Magie',
    'Dragons',
    'Romance',
    'Mystère',
    'Action',
    'Famille',
    'Humour',
    'Épique',
    'Court',
    'Série',
    'Classique',
  ];

  // Wishlist
  wishlist: number[] = [];

  constructor(private storyService: StoryService) {}

  ngOnInit(): void {
    this.loadPrograms();
    this.initializeFilters();
    this.loadWishlist();
  }

  /**
   * Charge tous les programmes
   */
  loadPrograms(): void {
    this.allPrograms = this.storyService.getStoriesOverview();
    this.filteredPrograms = [...this.allPrograms];
    this.updatePagination();
    this.extractAuthors();
  }

  /**
   * Initialise les options de filtres
   */
  initializeFilters(): void {
    this.categories = [
      { value: StoryCategories.Fantastique, label: 'Fantastique' },
      { value: StoryCategories.ContesLegendes, label: 'Contes & Légendes' },
      { value: StoryCategories.ScienceFiction, label: 'Science-Fiction' },
      { value: StoryCategories.HistoireAmour, label: "Histoire d'Amour" },
      { value: StoryCategories.Historique, label: 'Historique' },
      { value: StoryCategories.AventuresEpiques, label: 'Aventures Épiques' },
      { value: StoryCategories.Comedie, label: 'Comédie' },
      { value: StoryCategories.Inspiration, label: 'Inspiration' },
    ];
  }

  /**
   * Extrait la liste des auteurs uniques
   */
  extractAuthors(): void {
    const authorsSet = new Set<string>();
    this.allPrograms.forEach((program) => {
      if (program.author) {
        authorsSet.add(program.author);
      }
    });
    this.authors = Array.from(authorsSet).sort();
  }

  /**
   * Charge la wishlist depuis le localStorage
   */
  loadWishlist(): void {
    const saved = localStorage.getItem('programsWishlist');
    this.wishlist = saved ? JSON.parse(saved) : [];
  }

  /**
   * Sauvegarde la wishlist
   */
  saveWishlist(): void {
    localStorage.setItem('programsWishlist', JSON.stringify(this.wishlist));
  }

  // ===== RECHERCHE ET FILTRES =====

  /**
   * Déclenché lors du changement de recherche
   */
  onSearchChange(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  /**
   * Exécute une recherche
   */
  performSearch(): void {
    this.applyFilters();
  }

  /**
   * Applique tous les filtres
   */
  applyFilters(): void {
    let filtered = [...this.allPrograms];

    // Filtre par recherche
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (program) =>
          program.titre.toLowerCase().includes(query) ||
          program.author?.toLowerCase().includes(query) ||
          program.description?.toLowerCase().includes(query) ||
          this.getCategoryLabel(program.categorie).toLowerCase().includes(query)
      );
    }

    // Filtre par catégorie
    if (this.selectedCategory) {
      filtered = filtered.filter(
        (program) => program.categorie === this.selectedCategory
      );
    }

    // Filtre par auteur
    if (this.selectedAuthor) {
      filtered = filtered.filter(
        (program) => program.author === this.selectedAuthor
      );
    }

    // Filtre par note
    if (this.selectedRating) {
      const rating = parseFloat(this.selectedRating);
      filtered = filtered.filter((program) => (program.rating || 0) >= rating);
    }

    // Filtres avancés - durée
    if (this.durationMin !== null) {
      filtered = filtered.filter((program) => {
        const duration = this.parseDuration(program.duration);
        return duration >= this.durationMin!;
      });
    }

    if (this.durationMax !== null) {
      filtered = filtered.filter((program) => {
        const duration = this.parseDuration(program.duration);
        return duration <= this.durationMax!;
      });
    }

    // Filtre par tags
    if (this.selectedTags.length > 0) {
      filtered = filtered.filter((program) => {
        const programTags = program.tags || [];
        return this.selectedTags.some((tag) => programTags.includes(tag));
      });
    }

    // Filtre par statut
    if (!this.showCompleted || !this.showInProgress) {
      filtered = filtered.filter((program) => {
        const isCompleted = program.isCompleted ?? true;
        return (
          (this.showCompleted && isCompleted) ||
          (this.showInProgress && !isCompleted)
        );
      });
    }

    this.filteredPrograms = filtered;
    this.applySorting();
    this.currentPage = 1;
    this.updatePagination();
  }

  /**
   * Applique le tri
   */
  applySorting(): void {
    switch (this.sortBy) {
      case 'popularity':
        this.filteredPrograms.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case 'rating':
        this.filteredPrograms.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'recent':
        this.filteredPrograms.sort(
          (a, b) =>
            new Date(b.datePublished || 0).getTime() -
            new Date(a.datePublished || 0).getTime()
        );
        break;
      case 'alphabetical':
        this.filteredPrograms.sort((a, b) => a.titre.localeCompare(b.titre));
        break;
      case 'duration':
        this.filteredPrograms.sort(
          (a, b) =>
            this.parseDuration(a.duration) - this.parseDuration(b.duration)
        );
        break;
    }
    this.updatePagination();
  }

  /**
   * Parse la durée d'un programme
   */
  parseDuration(duration?: string): number {
    if (!duration) return 0;
    const match = duration.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }

  // ===== GESTION DES FILTRES =====

  /**
   * Bascule l'affichage des filtres avancés
   */
  toggleAdvancedFilters(): void {
    this.showAdvancedFilters = !this.showAdvancedFilters;
  }

  /**
   * Bascule un tag
   */
  toggleTag(tag: string): void {
    const index = this.selectedTags.indexOf(tag);
    if (index > -1) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.applyFilters();
  }

  /**
   * Vérifie s'il y a des filtres actifs
   */
  hasActiveFilters(): boolean {
    return !!(
      this.selectedCategory ||
      this.selectedAuthor ||
      this.selectedRating ||
      this.selectedTags.length > 0 ||
      this.durationMin !== null ||
      this.durationMax !== null ||
      !this.showCompleted ||
      !this.showInProgress
    );
  }

  /**
   * Efface un filtre spécifique
   */
  clearFilter(filterType: string): void {
    switch (filterType) {
      case 'category':
        this.selectedCategory = '';
        break;
      case 'author':
        this.selectedAuthor = '';
        break;
      case 'rating':
        this.selectedRating = '';
        break;
    }
    this.applyFilters();
  }

  /**
   * Efface tous les filtres
   */
  clearAllFilters(): void {
    this.searchQuery = '';
    this.selectedCategory = '';
    this.selectedAuthor = '';
    this.selectedRating = '';
    this.selectedTags = [];
    this.durationMin = null;
    this.durationMax = null;
    this.showCompleted = true;
    this.showInProgress = true;
    this.applyFilters();
  }

  // ===== AFFICHAGE ET PAGINATION =====

  /**
   * Change le mode d'affichage
   */
  setViewMode(mode: 'grid' | 'list'): void {
    this.viewMode = mode;
  }

  /**
   * Met à jour la pagination
   */
  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedPrograms = this.filteredPrograms.slice(startIndex, endIndex);
  }

  /**
   * Va à une page spécifique
   */
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
      this.scrollToTop();
    }
  }

  /**
   * Obtient les pages visibles pour la pagination
   */
  getVisiblePages(): number[] {
    const totalPages = this.totalPages;
    const current = this.currentPage;
    const delta = 2; // Nombre de pages de chaque côté

    let start = Math.max(1, current - delta);
    let end = Math.min(totalPages, current + delta);

    // Ajuste pour toujours avoir le bon nombre de pages
    if (end - start < delta * 2) {
      if (start === 1) {
        end = Math.min(totalPages, start + delta * 2);
      } else {
        start = Math.max(1, end - delta * 2);
      }
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  /**
   * Charge plus de programmes (infinite scroll)
   */
  loadMorePrograms(): void {
    if (this.hasMorePrograms()) {
      this.isLoading = true;
      setTimeout(() => {
        this.itemsPerPage += 12;
        this.updatePagination();
        this.isLoading = false;
      }, 500);
    }
  }

  /**
   * Vérifie s'il y a plus de programmes à charger
   */
  hasMorePrograms(): boolean {
    return this.paginatedPrograms.length < this.filteredPrograms.length;
  }

  /**
   * Fait défiler vers le haut
   */
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ===== UTILITAIRES =====

  /**
   * Obtient le libellé d'une catégorie
   */
  getCategoryLabel(category: any): string {
    const categoryOption = this.categories.find(
      (cat) => cat.value === category
    );
    return categoryOption ? categoryOption.label : 'Inconnu';
  }

  /**
   * Vérifie si un programme est nouveau
   */
  isNewProgram(program: Story): boolean {
    if (!program.datePublished) return false;
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return new Date(program.datePublished) > oneMonthAgo;
  }

  /**
   * Vérifie si un programme est dans la wishlist
   */
  isInWishlist(program: Story): boolean {
    return this.wishlist.includes(program.id);
  }

  // ===== ACTIONS =====

  /**
   * Lance la lecture d'un programme
   */
  playProgram(program: Story): void {
    console.log('Lancement de:', program.titre);
    // Ici tu peux naviguer vers la page de lecture
    // this.router.navigate(['/read', program.id]);
  }

  /**
   * Affiche les informations d'un programme
   */
  showProgramInfo(program: Story): void {
    console.log('Informations sur:', program.titre);
    // Ici tu peux ouvrir une modal ou naviguer vers une page de détail
  }

  /**
   * Ajoute/retire un programme de la wishlist
   */
  addToWishlist(program: Story): void {
    const index = this.wishlist.indexOf(program.id);
    if (index > -1) {
      this.wishlist.splice(index, 1);
    } else {
      this.wishlist.push(program.id);
    }
    this.saveWishlist();
  }

  /**
   * Partage un programme
   */
  shareProgram(program: Story): void {
    if (navigator.share) {
      navigator.share({
        title: program.titre,
        text: program.description,
        url: window.location.href + '/' + program.id,
      });
    } else {
      // Fallback pour les navigateurs qui ne supportent pas l'API Web Share
      const url = window.location.href + '/' + program.id;
      navigator.clipboard.writeText(url);
      // Ici tu peux afficher une notification
      console.log('Lien copié:', url);
    }
  }

  // ===== GETTERS =====

  get totalPrograms(): number {
    return this.allPrograms.length;
  }

  get totalCategories(): number {
    return this.categories.length;
  }

  get totalHours(): string {
    const total = this.allPrograms.reduce((sum, program) => {
      return sum + this.parseDuration(program.duration);
    }, 0);
    return total + 'h';
  }

  get totalPages(): number {
    return Math.ceil(this.filteredPrograms.length / this.itemsPerPage);
  }
}
