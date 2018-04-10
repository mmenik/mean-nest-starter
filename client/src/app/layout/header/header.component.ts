import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../app.reducer';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();

  isAuth$: Observable<boolean>;

  constructor(
    private readonly store: Store<fromRoot.State>,
    private readonly authService: AuthService
  ) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuthenticated);
  }

  onToggleSidenav() {
    this.toggleSidenav.emit();
  }

  onLogout() {
    this.authService.logout();
  }
}
