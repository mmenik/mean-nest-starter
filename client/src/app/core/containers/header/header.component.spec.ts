import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { AuthService } from '../../../auth/services/auth.service';

import { StoreModule, Store } from '@ngrx/store';
import { Logout } from '../../../auth/store/actions/auth.actions';
import * as fromRoot from '../../../app.reducer';
import { AppMaterialModule } from '../../../app-material.module';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authServiceStub: Partial<AuthService>;
  let authService: AuthService;
  let store: Store<fromRoot.State>;

  beforeAll(() => {
    authServiceStub = {
      logout: () => {
        store.dispatch(new Logout);
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
    const action = new Logout();

    authService = fixture.debugElement.injector.get(AuthService);
    authService.logout();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
