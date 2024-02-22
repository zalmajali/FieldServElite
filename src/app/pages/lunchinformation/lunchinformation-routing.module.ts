import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LunchinformationPage } from './lunchinformation.page';

const routes: Routes = [
  {
    path: '',
    component: LunchinformationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LunchinformationPageRoutingModule {}
