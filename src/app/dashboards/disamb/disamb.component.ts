import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { Udm, RankDataRecord, DisambData, CountriesList } from '../unified.data.model'
import { DashboardsService } from '../dashboards.service'

export interface RowData {
  rating: string;
  year: string;
  fname: string;
  url: string;
}

@Component({
  selector: 'app-sources-disamb',
  templateUrl: './disamb.component.html',
  styleUrls: [
    // Shared styles
    '../styles/partials/visualization-heading.scss',
    '../styles/partials/banner-callout.scss',
    // Page styles
    '../comparator/styles/comparator.component.scss',
    '../comparator/styles/comparator.responsive.scss',
    // Partial styles
    '../comparator/styles/partials/layout-c-specific.scss'
  ]
})
export class DisambComponent implements OnInit {
  displayedColumns: string[] = ['select', 'rating', 'year'];
  dataSource: MatTableDataSource<RowData>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('tableData', { static: true }) table: MatTable<RowData>;
  selection = new SelectionModel<RowData>(true, []);
  selectedCount: number
  udm: Udm = {}
  udmCount: number
  unDisambCount: number = 0
  disambData: DisambData = {}
  toDisambNamesList = []
  apiKey: string = ''
  disambjson: string = ''
  analysejson: string = ''


  // Data from the resolver
  originalData = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public service: DashboardsService
  ) {
    // tslint:disable-next-line:no-string-literal
    this.originalData = route.snapshot.data['tableData'];
    this.dataSource = new MatTableDataSource(this.originalData);
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    // define a custom sort for the date field
    this.dataSource.sortingDataAccessor = (item, property) => item[property];
    this.dataSource.sort = this.sort;
    this.udmCount = Object.keys(this.service.rankData).length
    this.apiKey = localStorage.getItem('apiKey') || ''
    //initial disambiguation
    this.service.getDisambiguationData().toPromise().then(responce => {
      this.service.disambData = responce
      let disambDataKeys = Object.keys(this.service.disambData)
      this.toDisambNamesList = Object.keys(this.service.rankData).filter(key => { return disambDataKeys.indexOf(key) == -1 })
      this.unDisambCount = this.toDisambNamesList.length
    })
  }

  prepare() {
    localStorage.setItem('apiKey', this.apiKey)
    let counter = this.unDisambCount
    this.toDisambNamesList.forEach(item => {
      this.service.getGoogleData(item, this.apiKey, this.service.rankData[item].country).toPromise().then(e => {
        this.disambData[item] = {
          origName: item,
          uName: e['items'][0].title,
          site: e['items'][0].displayLink,
          destUrl: e['items'][0].link
        }
      })
        .finally(() => {
          counter--
          if (counter == 0) {
            this.service.disambData = Object.assign(this.service.disambData, this.disambData)
            this.disambjson = JSON.stringify(this.disambData, null, 2)
            console.log('result', this.disambData)
            let disambDataKeys = Object.keys(this.service.disambData)
            this.toDisambNamesList = Object.keys(this.service.rankData).filter(key => { return disambDataKeys.indexOf(key) == -1 })
            this.unDisambCount = this.toDisambNamesList.length
          }
        })
    })
    console.log(this.apiKey)
  }

  /* To copy Text from Textbox */
  copyInputMessage(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  unify() {
    //Purify
    let skipedList = []
    let updatedList = []
    Object.keys(this.service.rankData).forEach(key => {
      //let keyRes = this.service.disambData[key].site || key
      if (!this.service.disambData[key]) {
        //No disambiguation index
        skipedList.push(key)
      }
      else {
        //disambiguation index
        let newKey = this.service.disambData[key].site
        if (!this.service.unifiedRankData[newKey]) {
          this.service.unifiedRankData[newKey] = {
            country: this.service.rankData[key].country,
            orgName: this.service.disambData[key]?.uName,
            ranks: this.service.rankData[key].ranks,
            rcount: this.service.rankData[key].rcount,
            syns: [key]
          }
        } else {
          this.service.unifiedRankData[newKey].syns.push(key)
          this.service.unifiedRankData[newKey].ranks = Object.assign(this.service.unifiedRankData[newKey].ranks, this.service.rankData[key].ranks)
          this.service.unifiedRankData[newKey].rcount += this.service.rankData[key].rcount
          updatedList.push(key)
        }
      }
    })
    //prepare Analysis data
    const data = this.service.unifiedRankData
    this.service.analysisData = Object.keys(data).map(key => {
      let newSysn = []
      if (data[key].syns) {
        data[key].syns.forEach(oName => {
          let oNameSplitted = oName.split(CountriesList.plain[data[key].country] + ' ')
          let clearedName = oNameSplitted && oNameSplitted.length == 2 ? oNameSplitted[1] : oName
          if (clearedName)
            clearedName = clearedName.trim()
          newSysn.push(clearedName)
          console.log(oNameSplitted, oNameSplitted.length, oNameSplitted, oNameSplitted[1], oName, clearedName)
        })
      }
      return { country: data[key].country, orgName: data[key].orgName, ranks: data[key].ranks, rcount: data[key].rcount, url: key, syns: newSysn, synsJoin: newSysn.join(' || ') }
    })
    this.analysejson = JSON.stringify(this.service.analysisData, null, 2)
    //
    /**
     * TODO
     * Add stepper component
     * + Для каждого университета в рейтинге ищем приведенное имя, добавляем данные в приведую модель данных Udm
     * + Ключем является hash имени университета.
     * + Таким образом у нас проиндексированная унифицированная информация. Возможно стоит при формировании хэша 
     * + добавлять название страны для исключения неопреденности.
     * + Котвертируем объект в массив и отображаем.
     * + Реализуем поиск по названию университета, фильтрацию по стране, вхождение минимум в три рейтинга, 
     * + Описание подробнее
     * Список сохраняем именным образом, чтобы потом сравнивать перечни по годам. (Add to comparision)
     * Сохраняем коллекции (набор рейтингов. Коллекция по умолчанию - нынешний список). Отображаем таблицы, но вместо рейтингов - коллекции.
     * страны с соглашением и Россию cltkfnm jgwbjyfkmyj .
     * Сверка с представленным списком.
     * Copyrights
     * Благодарности.
     * 
    */
  }
  nextStep() {
    this.router.navigate(['/analysis']);
  }
}
