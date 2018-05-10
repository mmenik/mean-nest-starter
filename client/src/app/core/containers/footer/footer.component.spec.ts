import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { DateComponent } from '../../components/date/date.component';

import { AppMaterialModule } from '../../../app-material.module';

import { StoreModule, Store } from '@ngrx/store';

import { ToggleTheme } from '../../store/actions/layout.actions';
import * as fromRoot from '../../../app.reducer';

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
    const action = new ToggleTheme();

    component.onToggleTheme();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
