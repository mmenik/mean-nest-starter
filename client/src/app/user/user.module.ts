import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { AppCommonModule } from '../app-common.module';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  imports: [
    AppCommonModule,
    UserRoutingModule
  ],
  declarations: [UserComponent]
})
export class UserModule { }
