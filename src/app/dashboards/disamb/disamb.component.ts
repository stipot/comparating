import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { Udm, RankDataRecord, DisambData } from '../unified.data.model'
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
    console.log(this.service.rankData)
    this.apiKey = localStorage.getItem('apiKey') || ''
    //initial disambiguation
    this.service.getDisambiguationData().toPromise().then(responce => {
      this.service.disambData = responce
      let disambDataKeys = Object.keys(this.service.disambData)
      console.log(disambDataKeys, this.service.rankData)
      this.toDisambNamesList = Object.keys(this.service.rankData).filter(key => { return disambDataKeys.indexOf(key) == -1 })
      this.unDisambCount = this.toDisambNamesList.length
    })
  }
  prepare() {
    localStorage.setItem('apiKey', this.apiKey)
    const testString = ['AU University of Western Australia', 'AU The University of Western AU']
    let counter = testString.length
    testString.forEach(item => {
      this.service.getGoogleData(item, this.apiKey).toPromise().then(e => {
        console.log(e)
        this.disambData[item] = {
          origName: item,
          uName: e['items'][0].title,
          site: e['items'][0].displayLink,
          destUrl: e['items'][0].link
        }
        counter--
        if (counter == 0) {
          this.service.disambData = Object.assign(this.service.disambData, this.disambData)
          this.disambjson = JSON.stringify(this.disambData, null, 2)
          console.log('result', this.disambData)
          let disambDataKeys = Object.keys(this.service.disambData)
          this.toDisambNamesList = Object.keys(this.service.rankData).filter(key => { return disambDataKeys.indexOf(key) == -1 })
          this.unDisambCount = this.toDisambNamesList.length
          console.log(disambDataKeys, this.unDisambCount)
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



  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  showSelected() {
    this.selectedCount = this.selection.selected.length
    return true
  }

  nextStep() {
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
    console.log('skiped', skipedList, updatedList, this.service.unifiedRankData)
    //this.router.navigate(['/description']);
    /**
     * TODO
     * Add stepper component
     * + Для каждого университета в рейтинге ищем приведенное имя, добавляем данные в приведую модель данных Udm
     * + Ключем является hash имени университета.
     * + Таким образом у нас проиндексированная унифицированная информация. Возможно стоит при формировании хэша 
     * + добавлять название страны для исключения неопреденности.
     * Список сохраняем именным образом, чтобы потом сравнивать перечни по годам. (Add to comparision)
     * Котвертируем объект в массив и отображаем.
     * Реализуем поиск по названию университета, фильтрацию по стране, вхождение минимум в три рейтинга, 
     * Сохраняем коллекции (набор рейтингов. Коллекция по умолчанию - нынешний список). Отображаем таблицы, но вместо рейтингов - коллекции.
     * страны с соглашением и Россию.
     * Сверка с представленным списком.
     * Описание подробнее
     * Copyrights
     * Благодарности.
     * 
    */
  }
}
