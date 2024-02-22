import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InspectionpointsaddPageRoutingModule } from './inspectionpointsadd-routing.module';

import { InspectionpointsaddPage } from './inspectionpointsadd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InspectionpointsaddPageRoutingModule
  ],
  declarations: [InspectionpointsaddPage]
})
export class InspectionpointsaddPageModule {}
