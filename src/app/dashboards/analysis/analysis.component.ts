import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCheckboxModule, MatCheckboxClickAction } from '@angular/material/checkbox';
import { Udm, RankDataRecord } from '../unified.data.model'
import { DashboardsService } from '../dashboards.service'
import { FormGroup, FormControl } from '@angular/forms';

export interface RowData {
  country: string
  orgName: string
  ranks: { [rankName: string]: string }
  rcount: number
  url: string
}

@Component({
  selector: 'app-sources-analysis',
  templateUrl: './analysis.component.html',
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
export class AnalysisComponent implements OnInit {
  filtersForm: FormGroup;
  displayedColumns: string[] = ['country', 'orgName', 'ranks', 'rcount'];
  dataSource: MatTableDataSource<RowData>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('table', { static: true }) table: MatTable<RowData>;
  selection = new SelectionModel<RowData>(true, []);
  selectedCount: number
  udm: Udm = {}
  //Filter
  selectedCountryFilter: string
  moreThen3
  countriesList = []

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
    this.filtersForm = new FormGroup({
      search: new FormControl(''),
      country: new FormControl(''),
      rcount: new FormControl(null)
    });
    this.filtersForm.valueChanges.subscribe(form => this.applyFilters(form));
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    // define a custom sort for the date field
    this.dataSource.sortingDataAccessor = (item, property) => item[property];
    this.dataSource.sort = this.sort;
    this.dataSource.filteredData.forEach(record => {
      if (this.countriesList.indexOf(record.country) == -1)
        this.countriesList.push(record.country)
    })
    console.log(this.service.analysisData,this.dataSource, this.countriesList)
  }

  // Run the filters for the table
  applyFilters(form): void {
    const results = [];
    this.originalData.forEach(row => {
      if (
        (!this.selectedCountryFilter || (this.selectedCountryFilter && row.country == this.selectedCountryFilter)) &&
        (!this.moreThen3 || this.moreThen3 && row.rcount > 2)
      ) {
        results.push(row);
      }
    });
    this.dataSource.data = results;
  }
  countryChange(event) {
    this.applyFilters(this.filtersForm.value);
  }
  filterby3(event) {
    this.moreThen3 = event
    this.applyFilters(this.filtersForm.value);
  }

  search(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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

  }
}
