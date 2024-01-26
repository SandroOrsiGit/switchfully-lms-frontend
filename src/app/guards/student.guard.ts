import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from '../services/user.service';

export const studentGuard: CanActivateFn = () => {
  const userService  = inject(UserService);
  const currentUser = userService.getCurrentUser()
  return (currentUser?.role == 'student');
};
