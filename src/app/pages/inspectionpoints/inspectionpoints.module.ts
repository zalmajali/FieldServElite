import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InspectionpointsPageRoutingModule } from './inspectionpoints-routing.module';

import { InspectionpointsPage } from './inspectionpoints.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InspectionpointsPageRoutingModule
  ],
  declarations: [InspectionpointsPage]
})
export class InspectionpointsPageModule {}
