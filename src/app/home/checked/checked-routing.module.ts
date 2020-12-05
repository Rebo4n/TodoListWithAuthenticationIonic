import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckedPage } from './checked.page';

const routes: Routes = [
  {
    path: '',
    component: CheckedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckedPageRoutingModule {}
