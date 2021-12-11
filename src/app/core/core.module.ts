import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';
// Items inside Side Menu
import { MatExpansionModule } from '@angular/material/expansion';
// Side Menu
import { MatSidenavModule } from '@angular/material/sidenav';

import { PortalModule } from '@angular/cdk/portal';

// Top Navbar
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { OptionALayoutComponent } from './layouts/option-a/option-a-layout.component';
import { OptionBLayoutComponent } from './layouts/option-b/option-b-layout.component';
import { OptionCLayoutComponent } from './layouts/option-c/option-c-layout.component';
import { OptionDLayoutComponent } from './layouts/option-d/option-d-layout.component';
import { EmptyLayoutComponent } from './layouts/empty/empty-layout.component';

import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import { MainMenuComponent } from './side-menus/main-menu/main-menu.component';

import { ColorPalettesService } from './color-palettes/color-palettes.service';
import { CustomIconsService } from './custom-icons/custom-icons.service';
import { MobileLayoutComponent } from './layouts/mobile/mobile-layout.component';
import { DynamicLayoutComponent } from './layouts/dynamic/dynamic-layout.component';
import { TranslocoRootModule } from '../transloco-root.module';

@NgModule({
  declarations: [
    OptionALayoutComponent,
    OptionBLayoutComponent,
    OptionCLayoutComponent,
    OptionDLayoutComponent,
    EmptyLayoutComponent,
    TopNavbarComponent,
    SideNavbarComponent,
    MainMenuComponent,

    MobileLayoutComponent,
    DynamicLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    // Material CDK modules
    PortalModule,
    // To detect screen size changes
    LayoutModule,
    // Material modules
    MatSidenavModule,
    MatExpansionModule,
    // Ng Bootstrap modules
    NgbDropdownModule,
    TranslocoRootModule
  ],
  exports: [
    OptionALayoutComponent,
    OptionBLayoutComponent,
    OptionCLayoutComponent,
    OptionDLayoutComponent,
    EmptyLayoutComponent,
    TopNavbarComponent,
    SideNavbarComponent,
    MainMenuComponent,
    MobileLayoutComponent,
    DynamicLayoutComponent
  ],
  providers: [
    // Inspired in: https://devblogs.microsoft.com/premier-developer/angular-how-to-editable-config-files/
    {
      provide: APP_INITIALIZER,
      useFactory: (colorPalettesService: ColorPalettesService) => {
        return () => colorPalettesService.init();
      },
      deps: [ColorPalettesService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (customIconsService: CustomIconsService) => {
        return () => customIconsService.init();
      },
      deps: [CustomIconsService],
      multi: true
    }
  ]
})
export class CoreModule { }
