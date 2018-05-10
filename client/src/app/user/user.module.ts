import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { AppCommonModule } from '../app-common.module';
import { UserListComponent } from './user-list/user-list.component';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './user.reducer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserEditComponent } from './user-edit/user-edit.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    AppCommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    StoreModule.forFeature('user', userReducer)
  ],
  declarations: [
    UserComponent,
    UserListComponent,
    UserEditComponent
  ],
  entryComponents: [UserEditComponent]
})
export class UserModule { }
