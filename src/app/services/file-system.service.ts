import { Injectable } from '@angular/core';
import { Paciente } from '../shared/paciente';

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {

  constructor() {
    if (localStorage.getItem("current_id") === null) {
      localStorage.setItem("current_id", "0");
    };
  }

  update_cid(): void {
    var id = Number(localStorage.getItem("current_id"));
    id += 1;
    localStorage.setItem("current_id", id.toString());
  }

  new_patient(paciente: Paciente): void {
    var id = localStorage.getItem("current_id");
    paciente.id = id;
    paciente.date_logged = Date.now().toString();
    localStorage.setItem(id, JSON.stringify(paciente));
    this.update_cid();
  }

  update_patient(paciente: Paciente): void {
    var id = paciente.id;
    localStorage.setItem(id, JSON.stringify(paciente));
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
      if(name){
        lista.push(name);
        data[name] = JSON.parse(localStorage.getItem(localStorage.key(n_items))).id;
      }
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
