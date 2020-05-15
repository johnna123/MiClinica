import { Component, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Paciente } from '../shared/paciente';

@Component({
  selector: 'app-pat-aps',
  templateUrl: './pat-aps.component.html',
  styleUrls: ['./pat-aps.component.scss']
})
export class PatApsComponent implements OnInit {

  apos: Paciente;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PatApsComponent>,
  ) { }

  ngOnInit(): void {
  }

}
