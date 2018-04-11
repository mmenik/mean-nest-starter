import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppMaterialModule } from './app-material.module';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        AppMaterialModule
    ],
    exports: [
        CommonModule,
        FlexLayoutModule,
        AppMaterialModule
    ]
})
export class AppCommonModule { }
