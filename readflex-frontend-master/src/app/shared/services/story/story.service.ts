import { Injectable } from '@angular/core';
import { Story } from '../../models/story';
import { Auteur } from '../../models/auteur';
import { StoryCategories } from '../../models/story-categories.enum';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  constructor() {}

  getStoriesOverview(): Story[] {
    const stories: Story[] = [
      {
        id: 1,
        titre: 'Les Misérables',
        imagestory:
          '/assets/images-herobanner/aaron-burden-4eWwSxaDhe4-unsplash.jpg',
        auteur: 'Victor Hugo' as Partial<Auteur>,
        author: 'Victor Hugo', // Propriété ajoutée pour compatibilité
        description:
          "Un classique de la littérature française qui raconte l'histoire de rédemption de Jean Valjean.",
        categorie: StoryCategories.ContesLegendes,
        rating: 4.8,
        views: 15420,
        datePublished: new Date('2023-01-15'),
      },
      {
        id: 2,
        titre: '1984',
        imagestory:
          '/assets/images-herobanner/aaron-burden-4eWwSxaDhe4-unsplash.jpg',
        auteur: 'George Orwell' as Partial<Auteur>,
        author: 'George Orwell',
        description:
          'Un roman dystopique sur la surveillance de masse et le contrôle de la pensée dans une société totalitaire.',
        categorie: StoryCategories.ContesLegendes,
        rating: 4.9,
        views: 23180,
        datePublished: new Date('2023-02-20'),
      },
      {
        id: 3,
        titre: 'Moby Dick',
        imagestory:
          '/assets/images-herobanner/aaron-burden-4eWwSxaDhe4-unsplash.jpg',
        auteur: 'Herman Melville' as Partial<Auteur>,
        author: 'Herman Melville',
        description:
          "L'épopée d'un capitaine de baleinier obsédé par la chasse d'un cachalot blanc.",
        categorie: StoryCategories.Comedie,
        rating: 4.3,
        views: 8920,
        datePublished: new Date('2023-03-10'),
      },
      {
        id: 4,
        titre: 'Le Petit Prince',
        imagestory:
          '/assets/images-herobanner/aaron-burden-4eWwSxaDhe4-unsplash.jpg',
        auteur: 'Antoine de Saint-Exupéry' as Partial<Auteur>,
        author: 'Antoine de Saint-Exupéry',
        description:
          "Un conte philosophique poétique sur l'amour, l'amitié et la quête de sens dans l'univers.",
        categorie: StoryCategories.ContesLegendes,
        rating: 4.7,
        views: 31250,
        datePublished: new Date('2023-04-05'),
      },
      {
        id: 5,
        titre: 'Crime et Châtiment',
        imagestory:
          '/assets/images-herobanner/aaron-burden-4eWwSxaDhe4-unsplash.jpg',
        auteur: 'Fiodor Dostoïevski' as Partial<Auteur>,
        author: 'Fiodor Dostoïevski',
        description:
          "Un roman qui explore la conscience morale à travers l'histoire d'un homme qui commet un meurtre.",
        categorie: StoryCategories.HistoireAmour,
        rating: 4.6,
        views: 12850,
        datePublished: new Date('2023-05-12'),
      },
      {
        id: 6,
        titre: "L'Étranger",
        imagestory:
          '/assets/images-herobanner/aaron-burden-4eWwSxaDhe4-unsplash.jpg',
        auteur: 'Albert Camus' as Partial<Auteur>,
        author: 'Albert Camus',
        description:
          "L'histoire de Meursault, un homme détaché qui commet un meurtre absurde et traverse son procès avec indifférence.",
        categorie: StoryCategories.Historique,
        rating: 4.4,
        views: 18760,
        datePublished: new Date('2023-06-18'),
      },
      {
        id: 7,
        titre: 'Don Quichotte',
        imagestory:
          '/assets/images-herobanner/aaron-burden-4eWwSxaDhe4-unsplash.jpg',
        auteur: 'Miguel de Cervantes' as Partial<Auteur>,
        author: 'Miguel de Cervantes',
        description:
          'Les aventures du chevalier errant Don Quichotte, qui se bat contre des moulins à vent et rêve de gloire chevaleresque.',
        categorie: StoryCategories.Inspiration,
        rating: 4.2,
        views: 9340,
        datePublished: new Date('2023-07-22'),
      },
      {
        id: 8,
        titre: 'Fahrenheit 451',
        imagestory:
          '/assets/images-herobanner/aaron-burden-4eWwSxaDhe4-unsplash.jpg',
        auteur: 'Ray Bradbury' as Partial<Auteur>,
        author: 'Ray Bradbury',
        description:
          'Dans un futur dystopique, les pompiers brûlent les livres dans une société qui craint la connaissance.',
        categorie: StoryCategories.ScienceFiction,
        rating: 4.8,
        views: 27590,
        datePublished: new Date('2023-08-30'),
      },
      {
        id: 9,
        titre: 'La Métamorphose',
        imagestory:
          '/assets/images-herobanner/aaron-burden-4eWwSxaDhe4-unsplash.jpg',
        auteur: 'Franz Kafka' as Partial<Auteur>,
        author: 'Franz Kafka',
        description:
          "Le récit d'un homme qui se réveille transformé en insecte géant, symbolisant l'isolement et la désintégration sociale.",
        categorie: StoryCategories.Fantastique,
        rating: 4.5,
        views: 14680,
        datePublished: new Date('2023-09-14'),
      },
      {
        id: 10,
        titre: 'Madame Bovary',
        imagestory:
          '/assets/images-herobanner/aaron-burden-4eWwSxaDhe4-unsplash.jpg',
        auteur: 'Gustave Flaubert' as Partial<Auteur>,
        author: 'Gustave Flaubert',
        description:
          "Un roman réaliste qui suit la vie d'Emma Bovary, une femme insatisfaite de son mariage et de sa vie provinciale.",
        categorie: StoryCategories.AventuresEpiques,
        rating: 4.1,
        views: 11240,
        datePublished: new Date('2023-10-08'),
      },
      // Histoires supplémentaires pour enrichir l'expérience
      {
        id: 11,
        titre: 'Le Seigneur des Anneaux',
        imagestory:
          '/assets/images-herobanner/aaron-burden-4eWwSxaDhe4-unsplash.jpg',
        auteur: 'J.R.R. Tolkien' as Partial<Auteur>,
        author: 'J.R.R. Tolkien',
        description:
          "Une épopée fantastique suivant Frodon dans sa quête pour détruire l'Anneau Unique.",
        categorie: StoryCategories.Fantastique,
        rating: 4.9,
        views: 45230,
        datePublished: new Date('2023-11-01'),
      },
      {
        id: 12,
        titre: "Harry Potter à l'école des sorciers",
        imagestory:
          '/assets/images-herobanner/aaron-burden-4eWwSxaDhe4-unsplash.jpg',
        auteur: 'J.K. Rowling' as Partial<Auteur>,
        author: 'J.K. Rowling',
        description:
          "L'histoire d'un jeune sorcier découvrant le monde magique de Poudlard.",
        categorie: StoryCategories.Fantastique,
        rating: 4.8,
        views: 52100,
        datePublished: new Date('2023-11-15'),
      },
      {
        id: 13,
        titre: 'Dune',
        imagestory:
          '/assets/images-herobanner/aaron-burden-4eWwSxaDhe4-unsplash.jpg',
        auteur: 'Frank Herbert' as Partial<Auteur>,
        author: 'Frank Herbert',
        description:
          "Une saga de science-fiction épique sur la planète désertique Arrakis et l'épice melange.",
        categorie: StoryCategories.ScienceFiction,
        rating: 4.7,
        views: 38750,
        datePublished: new Date('2023-12-01'),
      },
      {
        id: 14,
        titre: 'Orgueil et Préjugés',
        imagestory:
          '/assets/images-herobanner/aaron-burden-4eWwSxaDhe4-unsplash.jpg',
        auteur: 'Jane Austen' as Partial<Auteur>,
        author: 'Jane Austen',
        description:
          "L'histoire d'amour entre Elizabeth Bennet et Mr. Darcy dans l'Angleterre du 19ème siècle.",
        categorie: StoryCategories.HistoireAmour,
        rating: 4.6,
        views: 29840,
        datePublished: new Date('2024-01-10'),
      },
      {
        id: 15,
        titre: 'La Belle et la Bête',
        imagestory:
          '/assets/images-herobanner/aaron-burden-4eWwSxaDhe4-unsplash.jpg',
        auteur: 'Jeanne-Marie Leprince de Beaumont' as Partial<Auteur>,
        author: 'Jeanne-Marie Leprince de Beaumont',
        description:
          "Un conte classique sur l'amour véritable qui transcende les apparences.",
        categorie: StoryCategories.ContesLegendes,
        rating: 4.3,
        views: 22150,
        datePublished: new Date('2024-02-14'),
      },
    ];
    return stories;
  }

  /**
   * Obtient les histoires par catégorie
   */
  getStoriesByCategory(category: StoryCategories): Story[] {
    return this.getStoriesOverview().filter(
      (story) => story.categorie === category
    );
  }

  /**
   * Obtient les histoires les mieux notées
   */
  getTopRatedStories(limit: number = 5): Story[] {
    return this.getStoriesOverview()
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, limit);
  }

  /**
   * Obtient les histoires les plus populaires
   */
  getMostViewedStories(limit: number = 5): Story[] {
    return this.getStoriesOverview()
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, limit);
  }

  /**
   * Obtient les nouvelles histoires
   */
  getRecentStories(limit: number = 8): Story[] {
    return this.getStoriesOverview()
      .sort(
        (a, b) =>
          new Date(b.datePublished || 0).getTime() -
          new Date(a.datePublished || 0).getTime()
      )
      .slice(0, limit);
  }

  /**
   * Recherche des histoires par terme
   */
  searchStories(searchTerm: string): Story[] {
    if (!searchTerm.trim()) {
      return this.getStoriesOverview();
    }

    const term = searchTerm.toLowerCase();
    return this.getStoriesOverview().filter(
      (story) =>
        story.titre.toLowerCase().includes(term) ||
        story.author?.toLowerCase().includes(term) ||
        story.description?.toLowerCase().includes(term)
    );
  }
}
