import { PrestadorModel } from '../prestador.model';
import { TipoPrioridad } from '../tipoPrioridad';

export class TramiteDto {
  id: number = 0;
  nombre: string = '';
  descripcion: string = '';
  nombrePrestador: string = '';
  prioridad: TipoPrioridad = new TipoPrioridad();
  fechaLimite: Date = new Date();
  prestadorDTO: PrestadorModel = new PrestadorModel();
}
