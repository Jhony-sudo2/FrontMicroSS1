// guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../Services/Auth/auth.service';
import { TypeUser } from '../interfaces/User';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    return router.createUrlTree(['/auth/login'], { queryParams: { returnUrl: state.url } });
  }

  // Tipos requeridos por ruta (opcional)
  const required = route.data?.['types'] as TypeUser[] | TypeUser | undefined;
  if (required && !auth.hasType(required)) {
    return router.createUrlTree(['/forbidden']);
  }
  return true;
};
