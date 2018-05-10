import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import { LayoutActionTypes, ToggleTheme } from '../../store/actions/layout.actions';
import * as fromRoot from '../../../app.reducer';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  isDark$: Observable<boolean>;
  tokenExpirationDate$: Observable<Date>;

  constructor(private readonly store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.isDark$ = this.store.select(fromRoot.getIsDarkTheme);
    this.tokenExpirationDate$ = this.store.select(fromRoot.getTokenExpirationDate);
  }

  onToggleTheme() {
    this.store.dispatch(new ToggleTheme());
  }
}
