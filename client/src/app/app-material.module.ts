import { NgModule } from '@angular/core';
import {
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatListModule,
    MatTableModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatDialogModule
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
        MatSnackBarModule,
        MatListModule,
        MatTableModule,
        MatMenuModule,
        MatButtonToggleModule,
        MatDialogModule
    ]
})
export class AppMaterialModule { }
