import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

import { FileSystemService } from '../services/file-system.service'

@Component({
  selector: 'app-del-apoint-dialog',
  templateUrl: './del-apoint-dialog.component.html',
  styleUrls: ['./del-apoint-dialog.component.scss']
})
export class DelApointDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DelApointDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fileservice: FileSystemService,
  ) { }

  ngOnInit(): void {
  }

  confDelete():void{
    this.fileservice.delete_apointment(this.data);
    this.dialogRef.close();
  }

}
