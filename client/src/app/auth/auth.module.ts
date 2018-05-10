import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AppCommonModule } from '../app-common.module';
import { CoreModule } from '../core/core.module';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        AppCommonModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        CoreModule
    ]
})
export class AuthModule { }
