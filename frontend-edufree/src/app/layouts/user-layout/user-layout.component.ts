import {filter} from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent implements OnInit {

  closeSideBar: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  toggleSideBar(): void {
    this.closeSideBar = !this.closeSideBar;
  }


}
