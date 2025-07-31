import { Auteur } from './auteur';
import { StoryCategories } from './story-categories.enum';

export interface Story {
  id: number;
  titre: string;
  imagestory: string;
  auteur: Partial<Auteur>;
  description: string;
  categorie: StoryCategories;

  author: string;
  rating: number;
  views: number;
  datePublished: Date;

  duration?: string;
  tags?: string[];
  isFavorite?: boolean;
  readProgress?: number;
  language?: string;
  ageRating?: string;
  synopsis?: string;
  chapters?: number;
  isCompleted?: boolean;
  lastUpdated?: Date;
}
