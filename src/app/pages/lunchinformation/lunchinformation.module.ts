import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LunchinformationPageRoutingModule } from './lunchinformation-routing.module';

import { LunchinformationPage } from './lunchinformation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LunchinformationPageRoutingModule
  ],
  declarations: [LunchinformationPage]
})
export class LunchinformationPageModule {}
