import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatTooltipModule, MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { AuthentificationDirective } from "../directives/hasAuth.directive";

const exporting = [
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatMenuModule,
  MatDialogModule,
  MatInputModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatDatepickerModule,
  MatCheckboxModule,
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
];

@NgModule({
  declarations: [AuthentificationDirective],
  imports: exporting,
  exports: [...exporting, AuthentificationDirective],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 10000 } },
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: { showDelay: 250 } }
  ]
})
export class SharedModule { }
