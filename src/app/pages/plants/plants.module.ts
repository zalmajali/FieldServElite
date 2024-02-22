import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlantsPageRoutingModule } from './plants-routing.module';

import { PlantsPage } from './plants.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlantsPageRoutingModule
  ],
  declarations: [PlantsPage]
})
export class PlantsPageModule {}
