import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
      path : 'all',
      children:[{
        path: '',
        loadChildren: () => import('./all/all.module').then( m => m.AllPageModule)
      }]
      },
      {
        path : 'checked',
        children:[{
          path: '',
          loadChildren: () => import('./checked/checked.module').then( m => m.CheckedPageModule)
        }]
        }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
