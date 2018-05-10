import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { AppMaterialModule } from '../../app-material.module';

import * as Auth from '../../auth/auth.actions';
import * as fromRoot from '../../app.reducer';
import { StoreModule, Store } from '@ngrx/store';
import { AuthService } from '../../auth/auth.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authServiceStub: Partial<AuthService>;
  let authService: AuthService;
  let store: Store<fromRoot.State>;

  beforeAll(() => {
    authServiceStub = {
      logout: () => {
        store.dispatch(new Auth.Logout);
      }
    };
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        AppMaterialModule,
        StoreModule.forRoot(fromRoot.reducers)
      ],
      providers: [{ provide: AuthService, useValue: authServiceStub }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // authService = TestBed.get(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch an action on logout', () => {
    const action = new Auth.Logout();

    authService = fixture.debugElement.injector.get(AuthService);
    authService.logout();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
