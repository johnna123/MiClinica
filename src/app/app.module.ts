import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { MainPacientesComponent } from './main-pacientes/main-pacientes.component';
import { MainCitasComponent } from './main-citas/main-citas.component';
import { HeaderComponent } from './header/header.component';
import { AutocompleteFilterExample } from './autocomplete-filter-example/test.component';
import { NewPatientFormComponent } from './new-patient-form/new-patient-form.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPacientesComponent,
    MainCitasComponent,
    HeaderComponent,
    AutocompleteFilterExample,
    NewPatientFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  entryComponents: [
    NewPatientFormComponent,
  ],
  providers: [MatDatepickerModule,],
  bootstrap: [AppComponent]
})
export class AppModule { }
