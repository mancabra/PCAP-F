import { PrestadorModel } from '../prestador.model';

export class TramiteDto {
  id: number = 0;
  nombre: string = '';
  nombrePrestador: string = '';
  prioridad: number = 0;
  prestadorDTO: PrestadorModel = new PrestadorModel();
}
