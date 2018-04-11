import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import * as moment from 'moment';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnInit, OnDestroy {
  @Input() language: string;
  @Input() value: string;
  public date: string;

  private readonly interval$: Observable<any> = Observable.interval(1000);
  private subscription: Subscription;

  constructor() { }

  ngOnInit() {
    moment.locale(this.language);
    if (this.value) {
      this.date = moment(new Date(this.value)).format('DD-MM-YYYY HH:mm:ss');
    } else {
      this.date = moment().format('DD-MM-YYYY HH:mm:ss');
      this.subscription = this.interval$.subscribe(() => {
        this.date = moment().format('DD-MM-YYYY HH:mm:ss');
      });
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
