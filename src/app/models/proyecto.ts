import {Prestador} from "./prestador";

export class Proyecto {
  id: number = 0;
  representante: string = "";
  nombre: string = "";
  fechaInicio: string = "";
  fechaFin: string = "";
  prestadoresDeServicio: Prestador[] = [];
}
