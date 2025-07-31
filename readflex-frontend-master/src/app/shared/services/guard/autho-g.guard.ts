import { CanActivateFn } from '@angular/router';

export const authoGGuard: CanActivateFn = (route, state) => {
  return true;
};
