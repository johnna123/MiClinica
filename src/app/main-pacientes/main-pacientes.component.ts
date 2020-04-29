import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import {NewPatientFormComponent} from '../new-patient-form/new-patient-form.component';

@Component({
  selector: 'app-main-pacientes',
  templateUrl: './main-pacientes.component.html',
  styleUrls: ['./main-pacientes.component.scss']
})
export class MainPacientesComponent implements OnInit {


  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  paciente: string;

  constructor(
    public dialog:MatDialog
  ) { }


  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value)),
      );
    this.paciente="";
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  patientSelected(patient: string):void{
    this.paciente=patient
  }

  newPatientForm():void{
    this.dialog.open(NewPatientFormComponent,{width: '750px', height: '600px'})
  }

}
