import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DateComponent } from './date/date.component';

import { SpinnerComponent } from './spinner/spinner.component';
import { AppCommonModule } from '../app-common.module';

@NgModule({
    declarations: [
        HomeComponent,
        HeaderComponent,
        FooterComponent,
        SidenavComponent,
        DateComponent,
        SpinnerComponent
    ],
    imports: [
        AppCommonModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        SidenavComponent,
        SpinnerComponent
    ]
})
export class LayoutModule { }
