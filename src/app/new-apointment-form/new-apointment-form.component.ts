import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { MatDialog } from '@angular/material/dialog';

import { FileSystemService } from '../services/file-system.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

import { Cita } from '../shared/cita';


@Component({
  selector: 'app-new-apointment-form',
  templateUrl: './new-apointment-form.component.html',
  styleUrls: ['./new-apointment-form.component.scss']
})
export class NewApointmentFormComponent implements OnInit {

  myControl = new FormControl();
  options: string[];
  opt2id = {};
  filteredOptions: Observable<string[]>;

  patient_name: string;

  newApointmentForm: FormGroup;
  apointment: Cita;
  pid: number = -1;
  aid: number = -1;

  update: boolean = false;
  en: boolean = false;

  formErrors = {
    'name': '',
    'ap_date': '',
    'details': '',
  };
  validationMessages = {
    'name': {
      'required': 'Debes seleccionar un paciente',
    },
    'ap_date': {
      'required': 'Debes seleccionar una fecha',
    },
  };

  constructor(
    public dialog: MatDialog,
    private fileservice: FileSystemService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NewApointmentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) {
    var opts = this.fileservice.get_patients_names();
    this.options = opts[0];
    this.opt2id = opts[1];
    this.createForm();


  }

  createForm() {
    this.newApointmentForm = this.fb.group({
      name: ['', [Validators.required]],

      ap_date: ["", [Validators.required]],
      ap_time: ["", [Validators.required]],
      details: [""],
      cost: [0],
      pay: [0],

    });

    if (this.data) {
      this.pid = this.data[1]
      this.aid = this.data[0]
      var name = this.fileservice.get_name(this.pid);
      if (this.aid) {
        var apo = this.fileservice.get_apointment(this.aid, this.pid);

        this.patientSelected(name);
        this.newApointmentForm.get("ap_date").setValue(apo.ap_date);
        this.newApointmentForm.get("ap_time").setValue(apo.ap_time);
        this.newApointmentForm.get("details").setValue(apo.details);
        this.newApointmentForm.get("cost").setValue(apo.cost);
        this.newApointmentForm.get("pay").setValue(apo.pay);

        this.update = true;
        this.en = true;
      }
      else {
        this.patientSelected(name);
        this.en = true;
      }
    };
    this.newApointmentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }


  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value)),
      );
    this.patient_name = "";
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  patientSelected(patient: string): void {
    this.patient_name = patient
    this.newApointmentForm.get('name').setValue(patient);
  }

  onValueChanged(data?: any) {

    if (!this.newApointmentForm) { return; }
    const form = this.newApointmentForm;

    for (const field in this.formErrors) {

      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';

        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    if (this.update) {
      this.fileservice.update_apointment(this.newApointmentForm.value, this.aid, this.pid);
    }
    else {
      this.fileservice.push_apointment(this.newApointmentForm.value, this.opt2id[this.newApointmentForm.value.name]);
    }
    this.dialogRef.close(this.newApointmentForm.value.name);
  }

}
