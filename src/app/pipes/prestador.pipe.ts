import { Pipe, PipeTransform } from '@angular/core';
import { PrestadorModel } from '../models/prestador.model';

@Pipe({
  name: 'prestador',
})
export class PrestadorPipe implements PipeTransform {
  transform(
    prestadores: PrestadorModel[],
    search: string = ''
  ): PrestadorModel[] {
    let filteredPrestadores = prestadores;

    if (search.trim() !== '') {
      filteredPrestadores = filteredPrestadores.filter(
        (prestador) =>
          prestador.nombre.toLowerCase().includes(search.toLowerCase()) ||
          prestador.apellidoP.toLowerCase().includes(search.toLowerCase()) ||
          (
            prestador.nombre.toLowerCase() +
            ' ' +
            prestador.apellidoP.toLowerCase() +
            ' ' +
            prestador.apellidoM.toLowerCase()
          ).includes(search.toLowerCase())
      );
    }
    return filteredPrestadores;
  }
}
