import { Proyecto } from './proyecto';

export class PrestadorModel {
  id_prestador: number = 0;
  nombre: string = '';
  apellidoP: string = '';
  apellidoM: string = '';
  correo: string = '';
  telefono: string = '';
  proyecto: Proyecto = new Proyecto();
  curp: Boolean = false;
  actaNacimiento: Boolean = false;
  ine: Boolean = false;
  eFirma: Boolean = false;
  comprobanteDomicilio: Boolean = false;
  cuentaBancaria: Boolean = false;
  detalle: string = '';
  estado: string = '';
}
