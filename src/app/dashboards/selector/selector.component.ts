import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { Udm, RankDataRecord } from '../unified.data.model'
import { DashboardsService } from '../dashboards.service'

export interface RowData {
  rating: string;
  year: string;
  fname: string;
  url: string;
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
    console.log(this)
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
    //this.router.navigate(['/description']);
    this.selection.selected.forEach(rank => {
      this.service.getRatingData(rank.fname).toPromise().then(data => {
        console.log('recived', rank.fname, data)
        data.forEach(record => {
          const key = record.country.trim() + ': ' + record.name.trim()
          if (this.udm[key]) {
            this.udm[key].ranks[record.rating.trim()] =  typeof record.rank == "string" ? record.rank.trim() : record.rank
            this.udm[key].rcount++
          } else {
            this.udm[key] = {
              country: record.country.trim(),
              orgName: record.name.trim(),
              ranks: {
                [record.rating.trim()]: typeof record.rank == "string" ? record.rank.trim() : record.rank
              },
              rcount: 1
            }
          }
          console.log(this.udm)
        })
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
     * Благодарности.
     * 
    */
  }
}
