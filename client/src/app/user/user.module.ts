import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { AppCommonModule } from '../app-common.module';
import { UserListComponent } from './user-list/user-list.component';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './user.reducer';

@NgModule({
  imports: [
    AppCommonModule,
    UserRoutingModule,
    StoreModule.forFeature('user', userReducer)
  ],
  declarations: [
    UserComponent,
    UserListComponent
  ]
})
export class UserModule { }
