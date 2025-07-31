import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TeamMember {
  name: string;
  role: string;
  photo: string;
  linkedin?: string;
  email?: string;
}

interface Technology {
  name: string;
  icon: string;
}

interface TechCategory {
  name: string;
  technologies: Technology[];
}

@Component({
  selector: 'app-apropos-container',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './apropos-container.component.html',
  styleUrl: './apropos-container.component.scss',
})
export class AproposContainerComponent implements OnInit {
  newsletterEmail = '';
  isSubscribing = false;
  subscriptionSuccess = false;
  subscriptionError = false;

  // Données équipe (version compacte)
  teamMembers: TeamMember[] = [
    {
      name: 'Sophie Durand',
      role: 'CEO & Co-fondatrice',
      photo: '/assets/images/team/sophie.jpg',
      linkedin: 'https://linkedin.com/in/sophie-durand',
      email: 'sophie@histoires-streaming.com',
    },
    {
      name: 'Thomas Martin',
      role: 'CTO & Co-fondateur',
      photo: '/assets/images/team/thomas.jpg',
      linkedin: 'https://linkedin.com/in/thomas-martin-dev',
      email: 'thomas@histoires-streaming.com',
    },
    {
      name: 'Marie Leblanc',
      role: 'Directrice Artistique',
      photo: '/assets/images/team/marie.jpg',
      email: 'marie@histoires-streaming.com',
    },
    {
      name: 'Antoine Rousseau',
      role: 'Lead Developer',
      photo: '/assets/images/team/antoine.jpg',
      email: 'antoine@histoires-streaming.com',
    },
  ];

  // Technologies (version simplifiée)
  techStack: TechCategory[] = [
    {
      name: 'Frontend',
      technologies: [
        { name: 'Angular', icon: '🅰️' },
        { name: 'TypeScript', icon: '📘' },
        { name: 'SCSS', icon: '🎨' },
      ],
    },
    {
      name: 'Backend',
      technologies: [
        { name: 'Node.js', icon: '🟢' },
        { name: 'MongoDB', icon: '🍃' },
        { name: 'Express', icon: '⚡' },
      ],
    },
    {
      name: 'Cloud',
      technologies: [
        { name: 'AWS', icon: '☁️' },
        { name: 'Docker', icon: '🐳' },
        { name: 'CDN', icon: '🌐' },
      ],
    },
  ];

  constructor() {}

  ngOnInit(): void {
    // Pas d'animations complexes, tout s'affiche directement
  }

  // Newsletter simple
  subscribeNewsletter(): void {
    if (!this.newsletterEmail) return;

    this.isSubscribing = true;
    this.subscriptionSuccess = false;
    this.subscriptionError = false;

    // Simulation d'appel API simple
    setTimeout(() => {
      // 90% de succès
      if (Math.random() > 0.1) {
        this.subscriptionSuccess = true;
        this.newsletterEmail = '';
      } else {
        this.subscriptionError = true;
      }
      this.isSubscribing = false;

      // Reset messages après 3 secondes
      setTimeout(() => {
        this.subscriptionSuccess = false;
        this.subscriptionError = false;
      }, 3000);
    }, 1000);
  }
}
