import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
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
export class DescriptionComponent implements OnInit {
  activeLanguage: string
  constructor(
    private translocoService: TranslocoService
    ) { }

  ngOnInit(): void {
    this.activeLanguage = this.translocoService.getActiveLang();
    this.translocoService.langChanges$.subscribe(lang => this.activeLanguage = lang);
  }

}
