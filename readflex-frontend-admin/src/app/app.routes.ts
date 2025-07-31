import { Routes } from '@angular/router';

import { PageContent } from './feature/custom-sidenav/page-content/page-content';
import { PageComments } from './feature/custom-sidenav/page-comments/page-comments';
import { PageAnalystics } from './feature/custom-sidenav/page-analystics/page-analystics';
import { PageDashboardComponent } from './feature/custom-sidenav/page-dashboard/page-dashboard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    component: PageDashboardComponent,
  },
  {
    path: 'content',
    component: PageContent,
  },
  {
    path: 'comment',
    component: PageComments,
  },
  {
    path: 'satus',
    component: PageAnalystics,
  },
];
