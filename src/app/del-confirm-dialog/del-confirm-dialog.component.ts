import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FileSystemService } from '../services/file-system.service'

@Component({
  selector: 'app-del-confirm-dialog',
  templateUrl: './del-confirm-dialog.component.html',
  styleUrls: ['./del-confirm-dialog.component.scss']
})
export class DelConfirmDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DelConfirmDialogComponent>,
    private fileservice: FileSystemService,
  ) { }

  ngOnInit(): void {
  }

  confDelete() {
    this.fileservice.del_patient(this.data.id);
    parent.location.reload();
    this.dialogRef.close();
  }

}
