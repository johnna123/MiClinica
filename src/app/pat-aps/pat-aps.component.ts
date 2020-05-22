import { Component, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

import { NewApointmentFormComponent } from '../new-apointment-form/new-apointment-form.component'
import { DelApointDialogComponent } from '../del-apoint-dialog/del-apoint-dialog.component';

@Component({
  selector: 'app-pat-aps',
  templateUrl: './pat-aps.component.html',
  styleUrls: ['./pat-aps.component.scss']
})
export class PatApsComponent implements OnInit {

  saldo:number=0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PatApsComponent>,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    //mover esto a fileservice
    var costs=0;
    var pays=0;
    this.data.citas.forEach(element => {
      costs+=Number(element.cost);
      pays+=Number(element.pay);
    });
    this.saldo=costs-pays;
  }

  delApointmentForm(aid, id): void {
    let diag=this.dialog.open(DelApointDialogComponent, {  data: [aid, id] });
    diag.afterClosed().subscribe(result=>{if (result){this.dialogRef.close(this.data.name)}})
  }

  updatApointmenttDiag(aid, id): void {
    let diag=this.dialog.open(NewApointmentFormComponent, { width: '440px', height: '450px', data: [aid, id] });
    diag.afterClosed().subscribe(result=>{if (result){this.dialogRef.close(this.data.name)}})
  }

}
