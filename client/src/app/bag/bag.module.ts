import { NgModule } from '@angular/core';
import { BagComponent } from './bag.component';
import { AppCommonModule } from '../app-common.module';

@NgModule({
  imports: [
    AppCommonModule
  ],
  declarations: [BagComponent],
  exports: [BagComponent]
})
export class BagModule { }
