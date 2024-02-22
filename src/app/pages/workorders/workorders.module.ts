import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkordersPageRoutingModule } from './workorders-routing.module';

import { WorkordersPage } from './workorders.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkordersPageRoutingModule
  ],
  declarations: [WorkordersPage]
})
export class WorkordersPageModule {}
