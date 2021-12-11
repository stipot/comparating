import { Component, OnInit } from '@angular/core';
import { SideMenusService } from '../side-menus/side-menus.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: [
    './styles/side-navbar.component.scss'
  ]
})
export class SideNavbarComponent implements OnInit {

  constructor(
    private sideMenusService: SideMenusService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  logout() {
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

  toggleSearchMenu(): void {
    this.sideMenusService.renderAltMenuSubject.next('search');
    this.toggleAltMenu();
  }
}
