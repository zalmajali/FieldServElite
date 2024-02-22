import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InspectionpointsPage } from './inspectionpoints.page';

const routes: Routes = [
  {
    path: '',
    component: InspectionpointsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InspectionpointsPageRoutingModule {}
