import {Prestador} from "../prestador";

export class ProyectoDto {
  emailRepresentante: string = "";
  nombre: string = "";
  fechaInicio: string = "";
  fechaFin: string = "";
  emailsPrestadores: string[] = [];
}
