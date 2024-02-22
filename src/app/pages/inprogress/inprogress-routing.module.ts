import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InprogressPage } from './inprogress.page';

const routes: Routes = [
  {
    path: '',
    component: InprogressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InprogressPageRoutingModule {}
