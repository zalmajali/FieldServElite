import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TargetpestsPageRoutingModule } from './targetpests-routing.module';

import { TargetpestsPage } from './targetpests.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TargetpestsPageRoutingModule
  ],
  declarations: [TargetpestsPage]
})
export class TargetpestsPageModule {}
