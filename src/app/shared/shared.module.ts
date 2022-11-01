import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import {
  NgbProgressbarModule,
  NgbDatepickerModule,
  NgbRatingModule,
  NgbTimepickerModule,
  NgbPopoverModule,
  NgbCarouselModule,
  NgbTypeaheadModule,
  NgbDropdownModule
} from '@ng-bootstrap/ng-bootstrap';

// import { HttpClientModule } from '@angular/common/http';

import { ShellModule } from '../shell/shell.module';
import { FileUploaderDirective } from './file-uploader/file-uploader.directive';
import { ShowHidePasswordComponent } from './show-hide-password/show-hide-password.component';
import { ShowHideInputDirective } from './show-hide-password/show-hide-input.directive';
import { AlertTemplateComponent } from './alert-template/alert-template.component';
import { NotificationTemplateComponent } from './notification-template/notification-template.component';

@NgModule({
  declarations: [
    FileUploaderDirective,
    ShowHidePasswordComponent,
    ShowHideInputDirective,
    AlertTemplateComponent,
    NotificationTemplateComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ShellModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    // HttpClientModule
  ],
  exports: [
    // Re-export these modules to prevent repeated imports (see: https://angular.io/guide/ngmodule#re-exporting-other-modules)
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // HttpClientModule,
    ShellModule,
    RouterModule,
    FileUploaderDirective,
    ShowHidePasswordComponent,
    ShowHideInputDirective,
    AlertTemplateComponent,
    NotificationTemplateComponent,
    // angular material modules
    MatTableModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatInputModule,
    MatNativeDateModule,
    MatChipsModule,
    MatSelectModule,
    MatStepperModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSliderModule,
    MatIconModule,  // needed to use the MatIconRegistry to register our own icons
    // ng bootstrap modules
    NgbProgressbarModule,
    NgbDatepickerModule,
    NgbRatingModule,
    NgbTimepickerModule,
    NgbPopoverModule,
    NgbCarouselModule,
    NgbTypeaheadModule,
    NgbDropdownModule
  ]
})
export class SharedModule { }
