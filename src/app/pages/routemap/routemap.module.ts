import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoutemapPageRoutingModule } from './routemap-routing.module';

import { RoutemapPage } from './routemap.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoutemapPageRoutingModule
  ],
  declarations: [RoutemapPage]
})
export class RoutemapPageModule {}
