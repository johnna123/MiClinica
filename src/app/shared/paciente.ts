import {Cita} from './cita'

export class Paciente {
    id: string;
    name: string;
    birth: string;
    phone: number;
    date_logged: string;

    diabetes: boolean;
    hipertension: boolean;
    lupus: boolean;
    transtornos_tiroides: boolean;
    hemorragias_freq: boolean;
    tomando_medicamentos: boolean;
    embarazo: boolean;
    tratamiento_psiquiatrico: boolean;

    alergia: string;
    enf_otras: string;
    drogas: string;

    citas:Cita[]=[];
}
