import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { AppCommonModule } from '../app-common.module';

@NgModule({
  imports: [
    AppCommonModule,
    UserRoutingModule
  ],
  declarations: [UserComponent]
})
export class UserModule { }
