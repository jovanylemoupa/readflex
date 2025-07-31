import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';

export interface DashboardStats {
  totalUsers: number;
  totalBooks: number;
  totalAuthors: number;
  activeReaders: number;
  booksReadToday: number;
  newUsersThisMonth: number;
  topGenres: { name: string; count: number; percentage: number }[];
  monthlyStats: { month: string; users: number; books: number }[];
  userGrowthChart: { labels: string[]; datasets: any[] };
  genreChart: { labels: string[]; datasets: any[] };
  readingActivityChart: { labels: string[]; datasets: any[] };
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  // Nouvelle syntaxe Angular 17+ avec inject()
  private http = inject(HttpClient);

  constructor() {}

  getDashboardStats(): Observable<DashboardStats> {
    // Simulation de données - remplacez par vos vraies API calls
    const stats: DashboardStats = {
      totalUsers: 12547,
      totalBooks: 3892,
      totalAuthors: 485,
      activeReaders: 8234,
      booksReadToday: 1247,
      newUsersThisMonth: 342,
      topGenres: [
        { name: 'Fiction', count: 1250, percentage: 32 },
        { name: 'Science-Fiction', count: 980, percentage: 25 },
        { name: 'Romance', count: 756, percentage: 19 },
        { name: 'Thriller', count: 623, percentage: 16 },
        { name: 'Biographie', count: 283, percentage: 8 },
      ],
      monthlyStats: [
        { month: 'Jan', users: 8500, books: 3200 },
        { month: 'Fév', users: 9200, books: 3400 },
        { month: 'Mar', users: 10100, books: 3600 },
        { month: 'Avr', users: 11300, books: 3750 },
        { month: 'Mai', users: 11800, books: 3820 },
        { month: 'Jun', users: 12547, books: 3892 },
      ],
      userGrowthChart: {
        labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin'],
        datasets: [
          {
            label: 'Utilisateurs',
            data: [8500, 9200, 10100, 11300, 11800, 12547],
            fill: true,
            backgroundColor: 'rgba(63, 81, 181, 0.2)',
            borderColor: '#3f51b5',
            borderWidth: 3,
            tension: 0.4,
          },
          {
            label: 'Livres',
            data: [3200, 3400, 3600, 3750, 3820, 3892],
            fill: true,
            backgroundColor: 'rgba(76, 175, 80, 0.2)',
            borderColor: '#4caf50',
            borderWidth: 3,
            tension: 0.4,
          },
        ],
      },
      genreChart: {
        labels: [
          'Fiction',
          'Science-Fiction',
          'Romance',
          'Thriller',
          'Biographie',
        ],
        datasets: [
          {
            data: [1250, 980, 756, 623, 283],
            backgroundColor: [
              '#3f51b5',
              '#9c27b0',
              '#e91e63',
              '#ff5722',
              '#607d8b',
            ],
            borderWidth: 0,
          },
        ],
      },
      readingActivityChart: {
        labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
        datasets: [
          {
            label: 'Lectures par jour',
            data: [1200, 1900, 1600, 2100, 1800, 2400, 2200],
            backgroundColor: [
              '#3f51b5',
              '#3f51b5',
              '#3f51b5',
              '#3f51b5',
              '#3f51b5',
              '#4caf50',
              '#4caf50',
            ],
            borderColor: '#3f51b5',
            borderWidth: 2,
          },
        ],
      },
    };

    // Simule un délai de chargement
    return of(stats).pipe(delay(800));
  }

  // Méthodes pour récupérer des stats en temps réel
  getRealtimeStats(): Observable<any> {
    const realtimeData = {
      onlineUsers: Math.floor(Math.random() * 500) + 200,
      activeReadings: Math.floor(Math.random() * 100) + 50,
      serverLoad: Math.floor(Math.random() * 30) + 40,
    };
    return of(realtimeData).pipe(delay(200));
  }

  // Exemple d'appel API réel (décommentez si vous avez une API)
  /*
  getDashboardStatsFromAPI(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>('/api/dashboard/stats');
  }

  getUsersStatsFromAPI(): Observable<any> {
    return this.http.get('/api/users/statistics');
  }
  */
}
