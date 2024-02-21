import {Tramite} from "./tramite";

export class Prestador {
  id: number = 0;
  nombre: string = "";
  apellido: string = "";
  email: string = "";
  tramites: Tramite[] = [];
}
