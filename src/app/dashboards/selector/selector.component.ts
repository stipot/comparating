import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { Udm, RankDataRecord, CountriesList } from '../unified.data.model'
import { DashboardsService } from '../dashboards.service'

export interface RowData {
  rating: string;
  year: string;
  fname: string;
  url: string;
  ratingId: string
  type?: number
}

@Component({
  selector: 'app-sources-selector',
  templateUrl: './selector.component.html',
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
export class SelectorComponent implements OnInit {
  displayedColumns: string[] = ['select', 'rating', 'year'];
  dataSource: MatTableDataSource<RowData>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('table', { static: true }) table: MatTable<RowData>;
  selection = new SelectionModel<RowData>(true, []);
  selectedCount: number
  udm: Udm = {}
  countryList = []
  countryListString = ''

  // Data from the resolver
  originalData = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: DashboardsService
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
    //Load exclusion list
    this.service.getCountryExclList().toPromise().then(list => {
      this.service.countryExclusion = list
      this.countryList = Object.keys(list)
      this.countryListString = this.countryList.map(item => CountriesList.plain[item]).join(', ')
    })
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
    let counter = this.selection.selected.length
    let countryMap = {}
    Object.keys(CountriesList.plain).forEach(el => {
      countryMap[CountriesList.plain[el]] = el
    })
    //Local fix of disambiguation
    countryMap = Object.assign(countryMap, {
      "South Korea": "KR",
      "Taiwan": "TW",
      "Russia": "RU",
      "Serbia": "RS",
      "Iran": "IR",
      "Macau": "CN",
      "Vietnam": "VN" 
    })
    console.log(countryMap)
    this.selection.selected.forEach(rank => {
      this.service.getRatingData(rank.fname).toPromise().then(dataSrc => {
        let data: RankDataRecord[]
        if (rank?.type == 2) {
          data = dataSrc.map(el => {
            return {
              rank: el.rank,
              country: countryMap[el.country] || el.country,
              orgName: el.title,
              rating: rank.ratingId,
              year: rank.year
            }
          })
        } else data = dataSrc
        console.log(rank.rating, data)
        data.forEach(record => {
          if (!record.country || !record.orgName)
          console.log(record)
          const key = CountriesList.plain[record.country.trim()] + ' ' + record.orgName.trim()
          if (this.udm[key]) {
            this.udm[key].ranks[record.rating.trim()] = typeof record.rank == "string" ? record.rank.trim() : record.rank
            this.udm[key].rcount++
          } else {
            this.udm[key] = {
              country: record.country.trim(),
              orgName: record.orgName.trim(),
              ranks: {
                [record.rating.trim()]: typeof record.rank == "string" ? record.rank.trim() : record.rank
              },
              rcount: 1
            }
          }
        })
        counter--
        if (counter == 0) {
          //filter countries
          Object.keys(this.udm).forEach(key => {
            if (this.countryList.indexOf(this.udm[key].country) == -1)
              this.service.rankData[key] = this.udm[key]
          })
          this.service.rankDataCount = Object.keys(this.service.rankData).length
          this.router.navigate(['/disamb']);
        }
      })
    })
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
