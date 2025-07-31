import { CommonModule } from '@angular/common';
import { Component, computed, input, Input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
export type MenuItem = {
  icon: string;
  label: string;
  route?: string;
};
@Component({
  selector: 'app-custom-sidenav',
  imports: [MatListModule, MatIconModule, CommonModule, RouterModule],
  templateUrl: './custom-sidenav.html',
  styleUrl: './custom-sidenav.scss',
})
export class CustomSidenav {
  sideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }

  menuItems = signal<MenuItem[]>([
    {
      icon: 'dashboard',
      label: 'Tableau de bord',
      route: 'dashboard',
    },
    {
      icon: 'video_library',
      label: 'utilisateur',
      route: 'content',
    },
    {
      icon: 'alarm',
      label: 'Administration',
      route: 'comment',
    },
    {
      icon: 'accessible_forward',
      label: 'Faq',
      route: 'satus',
    },
  ]);

  profilePicSize = computed(() => (this.sideNavCollapsed() ? '32' : '100'));
}
