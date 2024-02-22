import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoutemapPage } from './routemap.page';

const routes: Routes = [
  {
    path: '',
    component: RoutemapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutemapPageRoutingModule {}
