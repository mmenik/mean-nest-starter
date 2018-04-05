import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AppCommonModule } from '../app-common.module';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
    imports: [
        AppCommonModule,
        AuthRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [
        LoginComponent
    ]
})
export class AuthModule { }
