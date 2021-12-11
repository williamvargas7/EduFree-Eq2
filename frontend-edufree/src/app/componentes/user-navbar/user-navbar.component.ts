import { Component, OnInit, ElementRef} from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.scss']
})
export class UserNavbarComponent implements OnInit {

  constructor(
    private backend: BackendService,
    public servicioGlobal: GlobalService
  ) {
  }

  ngOnInit(): void {
  }

  cerrarSesion(): void {
    this.backend.token = '';
    this.servicioGlobal.cerrarSesion();
  }
}
