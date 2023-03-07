import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'test',
        loadChildren: () =>
          import('../pages/test/test.module').then((m) => m.TestModule),
      },
      {
        path: 'test1',
        loadChildren: () =>
          import('../pages/test/test.module').then((m) => m.TestModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
