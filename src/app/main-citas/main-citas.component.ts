import { Component, OnInit } from '@angular/core';
import { FileSystemService } from '../services/file-system.service';
import { NewApointmentFormComponent } from '../new-apointment-form/new-apointment-form.component'
import { MatDialog } from '@angular/material/dialog';
import {Cita} from '../shared/cita';

@Component({
  selector: 'app-main-citas',
  templateUrl: './main-citas.component.html',
  styleUrls: ['./main-citas.component.scss']
})
export class MainCitasComponent implements OnInit {

  apointments:Cita[];

  constructor(
    private fileservice: FileSystemService,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.apointments=this.fileservice.get_active_aps();
  }

  newApointmentForm(): void {
    this.dialog.open(NewApointmentFormComponent, { width: '750px', height: '600px' })
  }

}
