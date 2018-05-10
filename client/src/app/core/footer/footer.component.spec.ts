import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { DateComponent } from '../date/date.component';
import { StoreModule, Store } from '@ngrx/store';

import * as Layout from '../../core/layout.actions';
import * as fromRoot from '../../app.reducer';
import { AppMaterialModule } from '../../app-material.module';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let store: Store<fromRoot.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FooterComponent,
        DateComponent
      ],
      imports: [
        AppMaterialModule,
        StoreModule.forRoot(fromRoot.reducers)
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch an action to toggle theme', () => {
    const action = new Layout.ToggleTheme();

    component.onToggleTheme();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
