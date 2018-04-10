import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { JwtModule } from '@auth0/angular-jwt';

import { AuthService } from './auth/auth.service';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { LayoutModule } from './layout/layout.module';

import { reducers, metaReducers } from './app.reducer';
import { AppCommonModule } from './app-common.module';
import { LayoutService } from './layout/layout.service';
import { BagModule } from './bag/bag.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppCommonModule,
    AppRoutingModule,
    LayoutModule,
    AuthModule,
    BagModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
        whitelistedDomains: ['localhost:4000']
      }
    })
  ],
  providers: [AuthService, LayoutService],
  bootstrap: [AppComponent]
})
export class AppModule { }
