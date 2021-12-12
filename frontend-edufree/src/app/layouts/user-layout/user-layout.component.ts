import { filter } from 'rxjs/operators';
import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent implements OnInit {

  sidebarIsOpen: boolean = true;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.animateSideBar();
  }

  toggleSideBar(): void {
    this.sidebarIsOpen = !this.sidebarIsOpen;
    this.animateSideBar();

  }

  animateSideBar(): void {

    const el = document.getElementById('idSidebar');
    if (el) {
      if (this.sidebarIsOpen) {
        this.renderer.removeClass(el, 'cls-hidden');
      } else {
        this.renderer.addClass(el, 'cls-hidden');
      }
    }
  }

}
