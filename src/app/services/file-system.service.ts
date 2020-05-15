import { Injectable } from '@angular/core';
import { Paciente } from '../shared/paciente';
import { Cita } from '../shared/cita';

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {

  constructor() {
    if (localStorage.getItem("current_id") === null) {
      localStorage.setItem("current_id", "0");
    };
    if (localStorage.getItem("active_aps") === null) {
      localStorage.setItem("active_aps", "[]");
    };
  }

  update_cid(): void {
    var id = Number(localStorage.getItem("current_id"));
    id += 1;
    localStorage.setItem("current_id", id.toString());
  }

  push_patient_data(paciente): void {
    var pat = new Paciente();
    if (paciente.id) {
      var id: string = paciente.id;
      pat.citas = paciente.citas;
    }
    else {
      var id = localStorage.getItem("current_id");

      pat.date_logged = Date.now().toString();
      this.update_cid();
    }
    pat.id = id;
    pat.name = paciente.name;
    pat.birth = paciente.birth;
    pat.phone = paciente.phone;
    pat.date_logged = paciente.date_logged;

    pat.diabetes = paciente.diabetes;
    pat.hipertension = paciente.hipertension;
    pat.lupus = paciente.lupus;
    pat.transtornos_tiroides = paciente.transtornos_tiroides;
    pat.hemorragias_freq = paciente.hemorragias_freq;
    pat.tomando_medicamentos = paciente.tomando_medicamentos;
    pat.embarazo = paciente.embarazo;
    pat.tratamiento_psiquiatrico = paciente.tratamiento_psiquiatrico;

    pat.alergia = paciente.alergia;
    pat.enf_otras = paciente.enf_otras;
    pat.drogas = paciente.drogas;


    console.log(pat)

    localStorage.setItem(id, JSON.stringify(pat));
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
      if (name) {
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

  push_apointment(data, id): void {
    var apo = new Cita();
    var pat = this.get_patient(id);
    apo.ap_date = data.ap_date;
    apo.ap_time = data.ap_time;
    apo.details = data.details;
    apo.cost = data.cost;
    apo.pay = data.pay;
    pat.citas.push(apo);
    this.push_patient_data(pat);

    var aps=this.get_active_aps();
    apo["patient"]=pat.name;
    aps.push(apo);
    localStorage.setItem("active_aps", JSON.stringify(aps));
  }

  get_active_aps():Cita[]{
    return JSON.parse(localStorage.getItem("active_aps"));
  }

}
