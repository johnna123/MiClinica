import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Paciente } from '../shared/paciente';

@Component({
  selector: 'app-new-patient-form',
  templateUrl: './new-patient-form.component.html',
  styleUrls: ['./new-patient-form.component.scss']
})
export class NewPatientFormComponent implements OnInit {

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
  ) {
    this.createForm();
  }

  createForm() {
    this.newPatForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      birth: ["",[Validators.required]],
      phone: ["",Validators.pattern("[0-9]*")],
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
    });
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
    this.patient = this.newPatForm.value;
    console.log('Paciente: ', this.patient);
    this.dialogRef.close();
  }

}
