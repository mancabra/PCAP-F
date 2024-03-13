import { Prestador } from "./prestador";
import { TipoPrioridad } from "./tipoPrioridad";

export class Tramite {
  id: number = 0;
  nombre: string = "";
  descripcion: string = "";
  estatus: number = 0;
  fechaLimite: string = "";
  prioridad: TipoPrioridad = new TipoPrioridad;
  prestador: Prestador = new Prestador;
}
