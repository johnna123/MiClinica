import { Injectable } from '@angular/core';
import { Paciente } from '../shared/paciente';
const electron = (<any>window).require('electron');


@Injectable({
  providedIn: 'root'
})
export class FileSystemService {

  constructor(private s: Storage) { }

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

}
