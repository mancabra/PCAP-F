import { Proyecto } from './proyecto';

export class PrestadorModel {
  id_prestador: number = 0;
  nombre: string = '';
  apellidoP: string = '';
  apellidoM: string = '';
  correo: string = '';
  telefono: string = '';
  proyectoDTO: Proyecto = new Proyecto();
}
