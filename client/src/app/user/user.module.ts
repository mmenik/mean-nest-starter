import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/reducers/user.reducer';

import { UserRoutingModule } from './user-routing.module';
import { AppCommonModule } from '../app-common.module';
import { CoreModule } from '../core/core.module';

import { UserPageComponent } from './containers/user-page/user-page.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserListComponent } from './components/user-list/user-list.component';

@NgModule({
  imports: [
    AppCommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    StoreModule.forFeature('user', reducer)
  ],
  declarations: [
    UserPageComponent,
    UserListComponent,
    UserEditComponent
  ],
  entryComponents: [UserEditComponent]
})
export class UserModule { }
