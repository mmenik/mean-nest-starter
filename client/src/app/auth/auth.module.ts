import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AppCommonModule } from '../app-common.module';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        AppCommonModule,
        AuthRoutingModule,
        ReactiveFormsModule
    ]
})
export class AuthModule { }
