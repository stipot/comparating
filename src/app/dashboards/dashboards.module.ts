import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ComparatorDashboardComponent } from './comparator/comparator.component'

// echarts - lib: https://github.com/xieziyu/ngx-echarts
import { NgxEchartsModule } from 'ngx-echarts';
import { DashboardsService } from './dashboards.service';
import { EcommerceDashboardResolver, CrmDashboardResolver } from './dashboards.resolver';
import { TranslocoRootModule } from '../transloco-root.module';
import { DescriptionComponent } from './description/description.component'

export const dashboardRoutes = [
  {
    path: '',
    redirectTo: 'comparator'
  },
  {
    path: 'comparator',
    component: ComparatorDashboardComponent,
    resolve: {
      data: EcommerceDashboardResolver
    }
  },
  {
    path: 'description',
    component: DescriptionComponent,
    resolve: {
      data: CrmDashboardResolver
    }
  }
];

@NgModule({
  declarations: [ComparatorDashboardComponent, DescriptionComponent],
  imports: [
    CommonModule,
    TranslocoRootModule,
    RouterModule.forChild(dashboardRoutes),
    // NgxEchartsModule,
    NgxEchartsModule.forRoot({
      /**
       * This will import all modules from echarts.
       * If you only need custom modules,
       * please refer to [Custom Build] section.
       */
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    }),
    SharedModule
  ],
  providers: [
    DashboardsService,
    EcommerceDashboardResolver,
    CrmDashboardResolver
  ],
  exports: [
    DescriptionComponent
  ]
})
export class DashboardsModule { }
