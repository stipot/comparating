import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Udm, RankDataRecord, DisambData } from './unified.data.model'

@Injectable()
export class DashboardsService {
  rankData: Udm = {}
  rankDataCount: number = 0
  unifiedRankData: Udm = {}
  disambData: DisambData = {}
  constructor(private http: HttpClient) { }

  getGoogleData(orgName: string, apiKey: string, gl: string = 'US') {
    return this.http.get('https://customsearch.googleapis.com/customsearch/v1?cx=52e4125fb3c1b7372&lr=lang_en&key=' + apiKey + '&q=' + orgName + "&gl="+ gl)
  }

  getSourcesListTableData(): Observable<any> {
    return this.http.get('/assets/data/compare/dbindex.json')
  }

  getRatingData(DataFileName: string): Observable<any> {
    return this.http.get('/assets/data/compare/' + DataFileName)
  }

  getDisambiguationData(): Observable<any> {
    return this.http.get('/assets/data/compare/disamb.json')
  }

  //DEPRECATED
  // ecommerce dashboard
  getRecentOrdersTableData(): Observable<any> {
    return this.http.get('/assets/data/ecommerce-dashboard/recent-orders-table.json');
  }

  getLatestTicketsTableData(): Observable<any> {
    return this.http.get('/assets/data/ecommerce-dashboard/latest-tickets-table.json');
  }

  // crm dashboard
  getLeadsTableData(): Observable<any> {
    return this.http.get('/assets/data/crm-dashboard/leads-table.json');
  }

  getTopSellersData(): Observable<any> {
    return this.http.get('/assets/data/crm-dashboard/top-sellers.json');
  }

  getLaggingSellersData(): Observable<any> {
    return this.http.get('/assets/data/crm-dashboard/lagging-sellers.json');
  }

  getArticles(): Observable<any> {
    return this.http.get('/assets/data/crm-dashboard/articles.json');
  }

  getTasks(): Observable<any> {
    return this.http.get('/assets/data/crm-dashboard/tasks.json');
  }
}
