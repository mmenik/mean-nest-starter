import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DateComponent } from './date/date.component';

import { SpinnerComponent } from './spinner/spinner.component';
import { AppCommonModule } from '../app-common.module';
import { RouterModule } from '@angular/router';
import { AutofocusDirective } from './autofocus/autofocus.directive';

@NgModule({
    declarations: [
        HomeComponent,
        HeaderComponent,
        FooterComponent,
        SidenavComponent,
        DateComponent,
        SpinnerComponent,
        AutofocusDirective
    ],
    imports: [
        AppCommonModule,
        RouterModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        SidenavComponent,
        SpinnerComponent,
        AutofocusDirective
    ]
})
export class LayoutModule { }
