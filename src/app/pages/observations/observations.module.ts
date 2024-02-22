import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ObservationsPageRoutingModule } from './observations-routing.module';

import { ObservationsPage } from './observations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ObservationsPageRoutingModule
  ],
  declarations: [ObservationsPage]
})
export class ObservationsPageModule {}
