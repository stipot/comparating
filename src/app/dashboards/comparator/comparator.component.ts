import { Component, PLATFORM_ID, Inject, ViewChild, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as echarts from 'echarts/lib/echarts';
/** echarts theme: */
import '../../../theme/echarts-theme.js';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'comparator-dashboard',
  templateUrl: './comparator.component.html',
  styleUrls: [
    // Shared styles
    '../styles/partials/visualization-heading.scss',
    '../styles/partials/banner-callout.scss',
    // Page styles
    './styles/comparator.component.scss',
    './styles/comparator.responsive.scss',
    // Partial styles
    './styles/partials/layout-c-specific.scss'
  ]
})
export class ComparatorDashboardComponent implements OnInit {

  isBrowser: boolean;
  values: any;
  chartColors: any = {
    success: '#28a745',
    error: '#dc3545',
    neutral: '#666d77',
    white: '#ffffff',
    blue3: '#bad4ff',
    blue4: '#a2c5ff',
    blue5: '#86b4ff',
    blue7: '#3b86fe',
    blue8: '#2e69c9',
    blue9: '#1b3e76'
  };

  recentOrdersTableDisplayedColumns: string[] = ['id', 'product', 'category', 'location', 'customer', 'price', 'date', 'status'];
  recentOrdersTableDataSource: any;

  latestTicketsTableDisplayedColumns: string[] = ['name', 'ticket_id', 'subject', 'phone', 'created_date', 'status'];
  latestTicketsTableDataSource: any;

  @ViewChild('recentOrdersSort', { static: true }) recentOrdersSort: MatSort;
  @ViewChild('latestTicketsSort', { static: true }) latestTicketsSort: MatSort;
  @ViewChild('latestTicketsPaginator', { static: true }) latestTicketsPaginator: MatPaginator;


  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  openDescriptionPage() {
    this.router.navigate(['/description']);
  }

  ngOnInit() {

  }
}
