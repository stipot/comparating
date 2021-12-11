import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { SideMenusService } from '../side-menus/side-menus.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: [
    './styles/top-navbar.component.scss'
  ]
})
export class TopNavbarComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  _mode = 'expanded';

  @HostBinding('attr.mode')
  @Input()
  set mode(val: string) {
    this._mode = (val !== undefined && val !== null) ? val : 'expanded';
  }
  get mode(): string {
    return this._mode;
  }

  constructor(
    private sideMenusService: SideMenusService,
    private router: Router
  ) {
  }

  ngOnInit() {}

  logout() {
  }

  toggleMainMenu(): void {
    this.sideMenusService.toggleMainMenuSubject.next('toggle');
  }

  toggleAltMenu(): void {
    this.sideMenusService.toggleAltMenuSubject.next('toggle');
  }

  toggleSettingsMenu(): void {
    this.sideMenusService.renderAltMenuSubject.next('settings');
    this.toggleAltMenu();
  }

  toggleNotificationsMenu(): void {
    this.sideMenusService.renderAltMenuSubject.next('notifications');
    this.toggleAltMenu();
  }
}
