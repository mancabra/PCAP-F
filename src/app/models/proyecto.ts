import {Prestador} from "./prestador";

export class Proyecto {
  id: number = 0;
  representante: string = "";
  nombre: string = "";
  progreso: number = 0;
  fechaInicio: string = "";
  fechaFin: string = "";
  prestadores: Prestador[] = [];
}
