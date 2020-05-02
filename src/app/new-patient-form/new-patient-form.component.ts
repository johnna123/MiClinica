import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileSystemService } from '../services/file-system.service'
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';

import { Paciente } from '../shared/paciente';

@Component({
  selector: 'app-new-patient-form',
  templateUrl: './new-patient-form.component.html',
  styleUrls: ['./new-patient-form.component.scss']
})
export class NewPatientFormComponent implements OnInit {

  update:boolean=false;
  patient: Paciente;
  newPatForm: FormGroup;
  formErrors = {
    'name': '',
    'birth': '',
    'phone': '',
  };
  validationMessages = {
    'name': {
      'required': 'Debes escribir un nombre',
      'minlength': 'El nombre es muy corto',
      'maxlength': 'Nombre muy largo',
    },
    'birth': {
      'required': 'Debes seleccionar una fecha',
    },
    'phone': {
      'pattern': 'Ese no es un numero',
    },
  };

  constructor(
    public dialogRef: MatDialogRef<NewPatientFormComponent>,
    private fb: FormBuilder,
    private fileservice: FileSystemService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.createForm();
  }

  createForm() {
    this.newPatForm = this.fb.group({
      id:'',
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      birth: ["", [Validators.required]],
      phone: ["", Validators.pattern("[0-9]*")],
      date_logged: [""],

      diabetes: [false],
      hipertension: [false],
      lupus: [false],
      transtornos_tiroides: [false],
      hemorragias_freq: [false],
      tomando_medicamentos: [false],
      embarazo: [false],
      tratamiento_psiquiatrico: [false],

      alergia: [""],
      enf_otras: [""],
      drogas: [""],

      cita: [""],
      cita_d: [""],
    });

    if(this.data){
      this.newPatForm.get('id').setValue(this.data.id);
      this.newPatForm.get('name').setValue(this.data.name);
      this.newPatForm.get('birth').setValue(this.data.birth);
      this.newPatForm.get('phone').setValue(this.data.phone);
      this.newPatForm.get('date_logged').setValue(this.data.date_logged);

      this.newPatForm.get('diabetes').setValue(this.data.diabetes);
      this.newPatForm.get('hipertension').setValue(this.data.hipertension);
      this.newPatForm.get('lupus').setValue(this.data.lupus);
      this.newPatForm.get('transtornos_tiroides').setValue(this.data.transtornos_tiroides);
      this.newPatForm.get('hemorragias_freq').setValue(this.data.hemorragias_freq);
      this.newPatForm.get('tomando_medicamentos').setValue(this.data.tomando_medicamentos);
      this.newPatForm.get('embarazo').setValue(this.data.embarazo);
      this.newPatForm.get('tratamiento_psiquiatrico').setValue(this.data.tratamiento_psiquiatrico);

      this.newPatForm.get('alergia').setValue(this.data.alergia);
      this.newPatForm.get('enf_otras').setValue(this.data.enf_otras);
      this.newPatForm.get('drogas').setValue(this.data.drogas);

      this.newPatForm.get('cita').setValue(this.data.cita);
      this.newPatForm.get('cita_d').setValue(this.data.cita_d);

      this.update=true;
    }
    this.newPatForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {

    if (!this.newPatForm) { return; }
    const form = this.newPatForm;

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

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.update){
      this.fileservice.update_patient(this.newPatForm.value);
      this.dialogRef.close();
    }
    else{
      this.fileservice.new_patient(this.newPatForm.value);
      this.dialogRef.close();
    };
  }

}
