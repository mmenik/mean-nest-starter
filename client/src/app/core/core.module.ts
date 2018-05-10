import { NgModule } from '@angular/core';

import { HomeComponent } from './containers/home/home.component';
import { HeaderComponent } from './containers/header/header.component';
import { FooterComponent } from './containers/footer/footer.component';
import { SidenavComponent } from './containers/sidenav/sidenav.component';
import { DateComponent } from './components/date/date.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

import { AppCommonModule } from '../app-common.module';
import { RouterModule } from '@angular/router';
import { AutofocusDirective } from './directives/autofocus/autofocus.directive';

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
export class CoreModule { }
