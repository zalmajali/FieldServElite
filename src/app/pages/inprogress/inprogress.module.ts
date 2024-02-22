import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InprogressPageRoutingModule } from './inprogress-routing.module';

import { InprogressPage } from './inprogress.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InprogressPageRoutingModule
  ],
  declarations: [InprogressPage]
})
export class InprogressPageModule {}
