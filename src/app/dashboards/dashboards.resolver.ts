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
export class DisambDashboardResolver implements Resolve<any> {

  constructor(private dashboardService: DashboardsService) { }

  resolve() {
    return new Promise((resolve, reject) => {
      this.dashboardService.getDisambiguationData()
        .subscribe((tableData: any) => {
          return resolve(tableData);
        });
    });
  }
}

@Injectable()
export class AnalysisDashboardResolver implements Resolve<any> {

  constructor(private dashboardService: DashboardsService) { }

  resolve() {
    return new Promise((resolve, reject) => {
      this.dashboardService.getAnalysisData()
        .subscribe((tableData: any) => {
          return resolve(tableData);
        });
    });
  }
}
