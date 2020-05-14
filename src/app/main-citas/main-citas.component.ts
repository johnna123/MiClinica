import { Component, OnInit } from '@angular/core';
import { FileSystemService } from '../services/file-system.service';
import { NewApointmentFormComponent } from '../new-apointment-form/new-apointment-form.component'
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-main-citas',
  templateUrl: './main-citas.component.html',
  styleUrls: ['./main-citas.component.scss']
})
export class MainCitasComponent implements OnInit {

  constructor(
    private fileservice: FileSystemService,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
  }

  newApointmentForm(): void {
    this.dialog.open(NewApointmentFormComponent, { width: '750px', height: '600px' })
  }

}
