import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Udm, RankDataRecord, DisambData, CountryExclusion, CountriesList, AnalysisDataRecord } from './unified.data.model'

@Injectable()
export class DashboardsService {
  rankData: Udm = {}
  countriesArr: []
  countries: { [code: string]: string } = {}
  rankDataCount: number = 0
  unifiedRankData: Udm = {}
  disambData: DisambData = {}
  analysisData: AnalysisDataRecord[] = []
  countryExclusion: CountryExclusion = {}
  constructor(private http: HttpClient) {
  }

  getGoogleData(orgName: string, apiKey: string, gl: string = 'US') {
    return this.http.get('https://customsearch.googleapis.com/customsearch/v1?cx=52e4125fb3c1b7372&lr=lang_en&key=' + apiKey + '&q=' + orgName + "&gl=" + gl)
  }

  getSourcesListTableData(): Observable<any> {
    return this.http.get('/assets/data/compare/dbindex.json')
  }

  getRatingData(DataFileName: string): Observable<any> {
    return this.http.get('/assets/data/ratings/' + DataFileName)
  }

  getDisambiguationData(): Observable<any> {
    return this.http.get('/assets/data/compare/disamb.json')
  }
  getCountryExclList(): Observable<any> {
    return this.http.get('/assets/data/compare/exclude.json')
  }
  getAnalysisData(): Observable<any> {
    return this.http.get('/assets/data/compare/analyse.json')
  }

}
