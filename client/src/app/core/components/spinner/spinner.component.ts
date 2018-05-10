import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  public isShowSpinner$: Observable<boolean>;
  public messageSpinner$: Observable<string>;

  constructor(private readonly store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.isShowSpinner$ = this.store.select(fromRoot.getIsShowSpinner);
    this.messageSpinner$ = this.store.select(fromRoot.getMessageSpinner);
  }

}
