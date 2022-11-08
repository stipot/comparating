import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { EmptyLayoutComponent } from './core/layouts/empty/empty-layout.component';
import { DynamicLayoutComponent } from './core/layouts/dynamic/dynamic-layout.component';

const routes: Routes = [
  /*
    Default route
  */
  { path: '', redirectTo: '/comparator', pathMatch: 'full' },
  /*
    Main routes + dynamic layouts
  */
  {
    path: '',
    component: DynamicLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule)
      }
    ]
  },
  /*
    Undefined routes (should redirect to a 404 page)
  */
  { path: '**', redirectTo: '/comparator', pathMatch: 'full' }
];

@NgModule({
  // Only call RouterModule.forRoot() in the root AppRoutingModule (or the AppModule if that's where you register
  // top level application routes). In any other module, you must call the RouterModule.forChild method to register additional routes.
  imports: [
    RouterModule.forRoot(routes, {
    // If you want to preload all lazy routes when the app loads, uncomment the following line
    // preloadingStrategy: PreloadAllModules,
    onSameUrlNavigation: 'reload',
})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
