import {Tramite} from "./tramite";
import { Usuario } from "./usuario";

export class Prestador {
  id: number = 0;
  nombre: string = "";
  apellido: string = "";
  email: string = "";
  tramites: Tramite[] = [];
  usuario: Usuario = new Usuario;
}
