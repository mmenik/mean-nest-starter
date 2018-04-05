import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatCardModule,
    MatInputModule,
    MatButtonModule
} from '@angular/material';

const COMMON_MODULE = [
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule
];

@NgModule({
    imports: [COMMON_MODULE],
    exports: [COMMON_MODULE]
})
export class AppCommonModule { }
