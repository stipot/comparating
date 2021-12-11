import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { DashboardsService } from './dashboards.service';
import { forkJoin } from 'rxjs';

@Injectable()
export class SourcesDashboardResolver implements Resolve<any> {

  constructor(private dashboardService: DashboardsService) { }

  resolve() {
    return new Promise((resolve, reject) => {
      this.dashboardService.getSourcesListTableData()
        .subscribe((tableData: any) => {
          return resolve(tableData);
        });
    });
  }
}

@Injectable()
export class CrmDashboardResolver implements Resolve<any> {

  constructor(private dashboardService: DashboardsService) { }

  resolve() {
    return new Promise((resolve, reject) => {
      forkJoin([
        this.dashboardService.getLeadsTableData(),
        this.dashboardService.getTopSellersData(),
        this.dashboardService.getLaggingSellersData(),
        this.dashboardService.getArticles(),
        this.dashboardService.getTasks()
      ])
        .subscribe((data: any) => {
          return resolve({
            leadsData: data[0],
            topSellers: data[1],
            laggingSellers: data[2],
            articles: data[3],
            tasks: data[4]
          });
        });
    });
  }
}
