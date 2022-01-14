import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class CustomIconsService {

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {}

  init(): void {
    // register custom icons
    this.registerIcons(
      ['comparanking-logo-2', 'comparanking-logo'], '/assets/icons/logos/');
    this.registerIcons(
      ['dashboards', 'forms', 'components', 'charts', 'tables', 'utilities'], '/assets/icons/sidemenu/');
  }

  registerIcons(icons: Array<string>, path: string) {
    icons.forEach((icon) => {
      this.matIconRegistry.addSvgIcon(
        icon,
        this.domSanitizer.bypassSecurityTrustResourceUrl(path + icon + '.svg')
      );
    });
  }
}
