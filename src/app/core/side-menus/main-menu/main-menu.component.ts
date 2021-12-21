import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: [
    './styles/main-menu.component.scss'
  ]
})
export class MainMenuComponent implements OnInit {
  availableLanguages
  activeLanguage: string
  constructor(private translocoService: TranslocoService) {
  }
  
  ngOnInit() {
    this.activeLanguage = this.translocoService.getActiveLang();
    this.availableLanguages = this.translocoService.getAvailableLangs();
    console.log(this.activeLanguage, this.availableLanguages)
  }
  setLang(lang){
    this.translocoService.setActiveLang(lang);
    this.activeLanguage = lang
  }
}