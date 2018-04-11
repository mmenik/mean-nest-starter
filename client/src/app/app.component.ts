import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs/Observable';

import { OverlayContainer } from '@angular/cdk/overlay';
import { environment } from '../environments/environment';

import { Store } from '@ngrx/store';
import * as fromRoot from './app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private readonly element: ElementRef,
    private readonly overlayContainer: OverlayContainer,
    private readonly authService: AuthService,
    private readonly store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.authService.init();
    this.store.select(fromRoot.getIsDarkTheme)
      .subscribe(isDark => {
        if (isDark) {
          this.element.nativeElement.classList.add(environment.darkTheme);
          this.overlayContainer.getContainerElement().classList.add(environment.darkTheme);
        } else {
          this.element.nativeElement.classList.remove(environment.darkTheme);
          this.overlayContainer.getContainerElement().classList.remove(environment.darkTheme);
        }
      });
  }
}
