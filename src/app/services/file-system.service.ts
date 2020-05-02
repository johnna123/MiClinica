import { Injectable } from '@angular/core';
import { Paciente } from '../shared/paciente';

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {

  constructor() { }

  new_patient(paciente: Paciente): void {
    var id = localStorage.length.toString();
    paciente.id = id;
    console.log(paciente);
    paciente.date_logged = Date.now().toString();
    localStorage.setItem(id, JSON.stringify(paciente));
  }

  update_patient(paciente: Paciente): void {
    var id = paciente.id;
    localStorage.setItem(id, JSON.stringify(paciente));
  }

  get_patients(): Paciente[] {
    var n_items = localStorage.length;
    var data = [];
    while (n_items--) {
      data.push(localStorage.getItem(localStorage.key(n_items)));
    }
    return data;
  }

  get_len(): number {
    return localStorage.length
  }

  get_patients_names(): any[] {
    var n_items = localStorage.length;
    var data = {};
    var lista = [];
    var name = "";
    while (n_items--) {

      name = JSON.parse(localStorage.getItem(localStorage.key(n_items))).name;
      lista.push(name);
      data[name] = JSON.parse(localStorage.getItem(localStorage.key(n_items))).id;
    }
    return [lista, data];
  }

  get_patient(id: string): Paciente {
    return JSON.parse(localStorage.getItem(id));
  }

  del_patient(id: string): void {
    localStorage.removeItem(id);
  }

}
