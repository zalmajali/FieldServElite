import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ObservationsPage } from './observations.page';

const routes: Routes = [
  {
    path: '',
    component: ObservationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ObservationsPageRoutingModule {}
