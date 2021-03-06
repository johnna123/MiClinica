import { Component, OnInit } from '@angular/core';
import { FileSystemService } from '../services/file-system.service';
import { NewApointmentFormComponent } from '../new-apointment-form/new-apointment-form.component'
import { DelApointDialogComponent } from '../del-apoint-dialog/del-apoint-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Cita } from '../shared/cita';

@Component({
  selector: 'app-main-citas',
  templateUrl: './main-citas.component.html',
  styleUrls: ['./main-citas.component.scss']
})
export class MainCitasComponent implements OnInit {

  apointments: Cita[];

  constructor(
    private fileservice: FileSystemService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.apointments = this.fileservice.get_active_aps();
  }

  newApointmentForm(): void {
    let diag = this.dialog.open(NewApointmentFormComponent, { width: '440px', height: '260px' });
    diag.afterClosed().subscribe(result => { if (result) {this.apointments = this.fileservice.get_active_aps()} })
  }

  delApointmentForm(aid, id): void {
    let diag = this.dialog.open(DelApointDialogComponent, { data: [aid, id] });
    diag.afterClosed().subscribe(result => { if (result) {this.apointments = this.fileservice.get_active_aps()} })
  }

  updatApointmenttDiag(aid, id): void {
    let diag = this.dialog.open(NewApointmentFormComponent, { width: '440px', height: '450px', data: [aid, id] });
    diag.afterClosed().subscribe(result => { if (result) {this.apointments = this.fileservice.get_active_aps()} })
  }

}
