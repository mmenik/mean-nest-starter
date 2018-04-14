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
    MatDialogModule,
    MatSortModule,
    MatPaginatorModule
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
        MatDialogModule,
        MatSortModule,
        MatPaginatorModule
    ]
})
export class AppMaterialModule { }
