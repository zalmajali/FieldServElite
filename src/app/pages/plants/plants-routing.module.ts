import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlantsPage } from './plants.page';

const routes: Routes = [
  {
    path: '',
    component: PlantsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlantsPageRoutingModule {}
