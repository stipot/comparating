import { Component, PLATFORM_ID, Inject, ViewChild, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as echarts from 'echarts/lib/echarts';
/** echarts theme: */
import '../../../theme/echarts-theme.js';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslocoService } from '@ngneat/transloco';

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

  activeLanguage: string

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private route: ActivatedRoute,
    private router: Router,
    private translocoService: TranslocoService
  ) {

  }

  openDescriptionPage() {
    this.router.navigate(['/description']);
  }

  ngOnInit() {
    this.activeLanguage = this.translocoService.getActiveLang();
    this.translocoService.langChanges$.subscribe(lang => this.activeLanguage = lang);
  }
}
