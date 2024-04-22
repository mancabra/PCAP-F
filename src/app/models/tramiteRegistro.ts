import { TipoPrioridad } from './tipoPrioridad';

export class TramiteRegistro {
  nombre: string = '';
  descripcion: string = '';
  estado: number = 0;
  fechaLimite: Date = new Date();
  idPrestador: number = 0;
  prioridad: TipoPrioridad = new TipoPrioridad();
}
