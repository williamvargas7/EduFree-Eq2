import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { BackendService } from '../services/backend.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AutorizacionGuard implements CanActivate, CanActivateChild {
  constructor(private backend: BackendService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    const tk = localStorage.getItem('tk');

    if (tk) {
      return true;
    } else {
      Swal.fire(
        '!!!!!',
        'No hay sesion activa',
        'error'
      );
      this.router.navigate(['/login']);
      return false;
    }
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
}
