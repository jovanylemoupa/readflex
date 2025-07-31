import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// PrimeNG Imports
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { ProgressBarModule } from 'primeng/progressbar';
import { PanelModule } from 'primeng/panel';
import { DividerModule } from 'primeng/divider';
import { SkeletonModule } from 'primeng/skeleton';
import { TooltipModule } from 'primeng/tooltip';
import { BadgeModule } from 'primeng/badge';
import { TagModule } from 'primeng/tag';
import {
  DashboardService,
  DashboardStats,
} from '../../../shared/service/dashbord-service/dashbord-service';

@Component({
  selector: 'app-page-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    ChartModule,
    ProgressBarModule,
    PanelModule,
    DividerModule,
    SkeletonModule,
    TooltipModule,
    BadgeModule,
    TagModule,
  ],
  templateUrl: './page-dashboard.html',
  styleUrls: ['./page-dashboard.scss'],
  // ← SUPPRESSION TEMPORAIRE des animations personnalisées
})
export class PageDashboardComponent implements OnInit {
  stats: DashboardStats | null = null;
  loading = true;

  // Propriétés pour l'animation de comptage
  animatedTotalUsers = 0;
  animatedTotalBooks = 0;
  animatedTotalAuthors = 0;
  animatedActiveReaders = 0;
  animatedBooksToday = 0;
  animatedNewUsers = 0;

  // Options pour les graphiques PrimeNG
  chartOptions = {
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          color: '#495057',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#495057',
        },
        grid: {
          color: '#ebedef',
        },
      },
      y: {
        ticks: {
          color: '#495057',
        },
        grid: {
          color: '#ebedef',
        },
      },
    },
  };

  pieChartOptions = {
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          color: '#495057',
        },
      },
    },
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;
    this.dashboardService.getDashboardStats().subscribe({
      next: (data) => {
        this.stats = data;
        this.loading = false;
        this.startCountingAnimations();
      },
      error: (error) => {
        console.error('Erreur lors du chargement des stats:', error);
        this.loading = false;
      },
    });
  }

  startCountingAnimations(): void {
    if (!this.stats) return;

    setTimeout(() => {
      this.animateCounter('animatedTotalUsers', this.stats!.totalUsers, 2000);
      this.animateCounter('animatedTotalBooks', this.stats!.totalBooks, 1800);
      this.animateCounter(
        'animatedTotalAuthors',
        this.stats!.totalAuthors,
        1600
      );
      this.animateCounter(
        'animatedActiveReaders',
        this.stats!.activeReaders,
        2200
      );
      this.animateCounter(
        'animatedBooksToday',
        this.stats!.booksReadToday,
        1400
      );
      this.animateCounter(
        'animatedNewUsers',
        this.stats!.newUsersThisMonth,
        1200
      );
    }, 300);
  }

  animateCounter(
    property: keyof PageDashboardComponent,
    targetValue: number,
    duration: number
  ): void {
    const startTime = Date.now();
    const startValue = 0;

    const updateCounter = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Fonction d'easing pour une animation plus fluide
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(
        startValue + (targetValue - startValue) * easeOut
      );

      (this as any)[property] = currentValue;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        (this as any)[property] = targetValue;
      }
    };

    requestAnimationFrame(updateCounter);
  }

  getGrowthPercentage(): number {
    if (!this.stats?.monthlyStats) return 0;
    const current = this.stats.monthlyStats[this.stats.monthlyStats.length - 1];
    const previous =
      this.stats.monthlyStats[this.stats.monthlyStats.length - 2];
    return ((current.users - previous.users) / previous.users) * 100;
  }

  refresh(): void {
    this.resetCounters();
    this.loadDashboardData();
  }

  exportData(): void {
    // Logique d'export des données
    if (!this.stats) return;

    const csvData = this.convertToCSV();
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dashboard-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  private convertToCSV(): string {
    if (!this.stats) return '';

    const headers = ['Métrique', 'Valeur'];
    const rows = [
      ['Utilisateurs Total', this.stats.totalUsers.toString()],
      ['Livres Total', this.stats.totalBooks.toString()],
      ['Auteurs Total', this.stats.totalAuthors.toString()],
      ['Lecteurs Actifs', this.stats.activeReaders.toString()],
      ["Lectures Aujourd'hui", this.stats.booksReadToday.toString()],
      ['Nouveaux Utilisateurs', this.stats.newUsersThisMonth.toString()],
    ];

    return [headers, ...rows].map((row) => row.join(',')).join('\n');
  }

  private resetCounters(): void {
    this.animatedTotalUsers = 0;
    this.animatedTotalBooks = 0;
    this.animatedTotalAuthors = 0;
    this.animatedActiveReaders = 0;
    this.animatedBooksToday = 0;
    this.animatedNewUsers = 0;
  }
}
