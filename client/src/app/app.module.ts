import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

import { AuthService } from './auth/auth.service';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { LayoutModule } from './layout/layout.module';

import { reducers, metaReducers } from './app.reducer';
import { AppCommonModule } from './app-common.module';
import { LayoutService } from './layout/layout.service';
import { UserService } from './user/user.service';
import { AppHttpInterceptor } from './app-http.interceptor';

// JwtModule.forRoot({
//   config: {
//     tokenGetter: () => {
//       return localStorage.getItem('access_token');
//     },
//     whitelistedDomains: [/^null$/]
//   }
// })

export function jwtOptionsFactory() {
  return {
    tokenGetter: () => localStorage.getItem('access_token'),
    whitelistedDomains: [/^null$/]
  };
}

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
    StoreModule.forRoot(reducers, { metaReducers }),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    },
    AuthService,
    UserService,
    LayoutService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
