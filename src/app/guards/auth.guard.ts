import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {UserService} from "../services/user.service";

export const authGuard: CanActivateFn = () => {
  const userService  = inject(UserService);
  const currentUser = userService.getCurrentUser()
  return (!!currentUser);
};
