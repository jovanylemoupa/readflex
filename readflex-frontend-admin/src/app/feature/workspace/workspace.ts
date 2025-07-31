import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CustomSidenav } from '../custom-sidenav/custom-sidenav';

@Component({
  selector: 'app-workspace',
  imports: [
    RouterOutlet,
    MatToolbarModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    CustomSidenav,
  ],
  templateUrl: './workspace.html',
  styleUrl: './workspace.scss',
})
export class Workspace {
  title = 'frontend';
  collapsed = signal(false);

  sidenavWith = computed(() => (this.collapsed() ? '65px' : '250px'));
}
