import {Prestador} from "./prestador";
import {Gestor} from "./gestor";

export class Proyecto {
  id: number = 0;
  representante: Gestor = new Gestor();
  nombre: string = "";
  fechaInicio: string = "";
  fechaFin: string = "";
  prestadoresDeServicio: Prestador[] = [];
}
