import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
  path: string;
  title: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/administrador-usuarios', title: 'Usuarios', class: '' },
  { path: '/administrador-programas', title: 'Programas', class: '' },
  { path: '/administrador-asignaturas', title: 'Maps', class: '' },
  { path: '/administrador-calificaciones', title: 'Notifications', class: '' },
  { path: '/user-profile', title: 'User Profile', class: '' },
  { path: '/administrador-grupos', title: 'Table List', class: '' }
];

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.scss']
})
export class UserSidebarComponent implements OnInit {
  menuItems: any[] | undefined;

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  };
}
