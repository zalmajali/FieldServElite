import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TargetpestsPage } from './targetpests.page';

const routes: Routes = [
  {
    path: '',
    component: TargetpestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TargetpestsPageRoutingModule {}
