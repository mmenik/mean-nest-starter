import { NgModule } from '@angular/core';
import {
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
} from '@angular/material';

@NgModule({
    exports: [
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatSnackBarModule
    ]
})
export class MaterialModule { }
