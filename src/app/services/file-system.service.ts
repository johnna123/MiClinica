import { Injectable } from '@angular/core';
import { Paciente } from '../shared/paciente';
import { Cita } from '../shared/cita';
import { IpcRenderer } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {
  private _ipc: IpcRenderer | undefined;
  constructor(
  ) {
    if (localStorage.getItem("current_id") === null) {
      localStorage.setItem("current_id", "0");
    };
    if (localStorage.getItem("current_ap_id") === null) {
      localStorage.setItem("current_ap_id", "0");
    };
    if (localStorage.getItem("active_aps") === null) {
      localStorage.setItem("active_aps", "[]");
    };
    //    if (window.require) {
    //      try {
    //        this._ipc = window.require('electron').ipcRenderer;
    //      } catch (e) {
    //        throw e;
    //      }
    //    } else {
    //      console.warn('Electron\'s IPC was not loaded');
    //    }
    this._ipc = window.require('electron').ipcRenderer;
  }

  update_cid(): void {
    var id = Number(localStorage.getItem("current_id"));
    id += 1;
    localStorage.setItem("current_id", id.toString());
  }

  update_aid(): void {
    var id = Number(localStorage.getItem("current_ap_id"));
    id += 1;
    localStorage.setItem("current_ap_id", id.toString());
  }

  push_patient_data(paciente): void {
    var pat = new Paciente();
    if (paciente.id) {
      var id: string = paciente.id;
      pat.citas = paciente.citas;
      pat.date_logged = paciente.date_logged;
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
    apo.pid = id;
    apo.cost = data.cost;
    apo.pay = data.pay;
    apo.ap_id = localStorage.getItem("current_ap_id");
    this.update_aid();
    pat.citas.push(apo);
    pat.citas.sort((a, b) => (a.ap_date > b.ap_date) ? 1 : (a.ap_date === b.ap_date) ? ((a.ap_time > b.ap_time) ? 1 : -1) : -1)
    this.push_patient_data(pat);

    var aps = this.get_active_aps();
    apo["patient"] = pat.name;
    aps.push(apo);
    aps.sort((a, b) => (a.ap_date > b.ap_date) ? 1 : (a.ap_date === b.ap_date) ? ((a.ap_time > b.ap_time) ? 1 : -1) : -1)
    localStorage.setItem("active_aps", JSON.stringify(aps));
  }


  get_active_aps(): Cita[] {
    var now = new Date().toISOString();
    var aps = JSON.parse(localStorage.getItem("active_aps"));
    var new_aps = [];
    aps.forEach(element => {
      if (element.ap_date > now) {
        new_aps.push(element)
      }
    });
    localStorage.setItem("active_aps", JSON.stringify(new_aps));
    return JSON.parse(localStorage.getItem("active_aps"));
  }

  get_idx_by_id(arr, id): number {
    var count = 0;
    var idx = 0;
    arr.forEach(function (value) {
      if (value.ap_id == id) {
        idx = count;
        return;
      }
      count++;
    });
    return idx;
  }

  delete_apointment(data): void {
    var aid = data[0];
    var pid = data[1];

    var full_pat = this.get_patient(pid);
    var active_aps = this.get_active_aps();
    var idx = this.get_idx_by_id(full_pat.citas, aid);
    if (idx > -1) {
      full_pat.citas.splice(idx, 1);
    }

    idx = this.get_idx_by_id(active_aps, aid);
    if (idx > -1) {
      active_aps.splice(idx, 1);
    }


    localStorage.setItem("active_aps", JSON.stringify(active_aps));
    this.push_patient_data(full_pat);
  }

  update_apointment(data, aid, pid): void {
    this.delete_apointment([aid, pid]);
    this.push_apointment(data, pid);
  }

  get_apointment(aid, pid): Cita {
    var pat = this.get_patient(pid);
    var c = new Cita;
    pat.citas.forEach(function (value) {
      if (value.ap_id == aid) {
        c = value;
        return;
      }
    });
    return c;
  }

  get_name(id): string {
    var pat = this.get_patient(id)
    return pat.name;
  }

  custom_close(): void {
    var values = {},
      keys = Object.keys(localStorage),
      i = keys.length;

    while (i--) {
      values[keys[i]] = localStorage.getItem(keys[i])
    }
    if (!this._ipc) {
      return;
    }
    this._ipc.send("custom_close", JSON.stringify(values));

  }

}
