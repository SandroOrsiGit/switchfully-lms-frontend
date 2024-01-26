import { CanActivateFn } from '@angular/router';
import {UserService} from "../services/user.service";
import {inject} from "@angular/core";

export const coachGuard: CanActivateFn = () => {
  const userService  = inject(UserService);
  const currentUser = userService.getCurrentUser()
  return (currentUser?.role == 'coach');
};
