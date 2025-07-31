import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        './features/home/pages/home-container/home-container.component'
      ).then((m) => m.HomeContainerComponent),
  },
  {
    path: 'se-connecter',
    loadComponent: () =>
      import(
        './features/se_connecter/pages/se-connecter-container/se-connecter-container.component'
      ).then((m) => m.SeConnecterContainerComponent),
  },
  {
    path: 's-identifier',
    loadComponent: () =>
      import(
        './features/s_Identifier/pages/s-identifier-container/s-identifier-container.component'
      ).then((m) => m.SIdentifierContainerComponent),
  },
  {
    path: 'nos-programme',
    loadComponent: () =>
      import(
        './features/nos-programmes/pages/programme-container/programme-container.component'
      ).then((m) => m.ProgrammeContainerComponent),
  },
  {
    path: 'faq',
    loadComponent: () =>
      import(
        './features//faq/pages/faq-container/faq-container.component'
      ).then((m) => m.FaqContainerComponent),
  },
  {
    path: 'a-propos',
    loadComponent: () =>
      import(
        './features/Apropos/pages/apropos-container/apropos-container.component'
      ).then((m) => m.AproposContainerComponent),
  },
  {
    path: 'home-story',
    loadComponent: () =>
      import(
        './features/read-home/pages/read-container/read-container.component'
      ).then((m) => m.ReadContainerComponent),
  },
  {
    path: 'write-admin',
    loadComponent: () =>
      import(
        './features/admin/components/writeplace/writeplace.component'
      ).then((m) => m.WriteplaceComponent),
  },
  {
    path: 'nous-contacter',
    loadComponent: () =>
      import(
        './features/nous-contacter/pages/nouscontacter-container/nouscontacter-container.component'
      ).then((m) => m.NouscontacterContainerComponent),
  },
];
