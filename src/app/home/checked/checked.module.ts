import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckedPageRoutingModule } from './checked-routing.module';

import { CheckedPage } from './checked.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckedPageRoutingModule
  ],
  declarations: [CheckedPage]
})
export class CheckedPageModule {}
