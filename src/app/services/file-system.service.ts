import { Injectable } from '@angular/core';
import { Paciente } from '../shared/paciente';

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {

  constructor() { }

  new_patient(paciente: Paciente): void {
    var id=localStorage.length.toString();
    paciente.id=id;
    localStorage.setItem(id, JSON.stringify(paciente));
  }

  get_patients(): Paciente[]{
    var n_items=localStorage.length;
    var data=[];
    while (n_items--){
      data.push(localStorage.getItem(localStorage.key(n_items)));
    }
    return data;
  }

  get_len(): number{
    return localStorage.length
  }

  get_patients_names(): any[]{
    var n_items=localStorage.length;
    var data={};
    var lista=[];
    while (n_items--){
      
      
      lista.push(JSON.parse(localStorage.getItem(localStorage.key(n_items))).name);
      data[JSON.parse(localStorage.getItem(localStorage.key(n_items))).name=JSON.parse(localStorage.getItem(localStorage.key(n_items))).id];
    }
    return [lista,data];
  }

}
