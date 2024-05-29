import { Pipe, PipeTransform } from '@angular/core';
import { TramiteDto } from '../models/dto/tramiteDto';

@Pipe({
  name: 'tramite',
})
export class TramitePipe implements PipeTransform {
  transform(
    tramites: TramiteDto[],
    search: string = '',
    filter: string = ''
  ): TramiteDto[] {
    let filteredTramites = tramites;

    if (search.trim() !== '') {
      filteredTramites = filteredTramites.filter(
        (tramite) =>
          tramite.prestadorDTO.nombre
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          tramite.prestadorDTO.proyecto.nombre
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          tramite.prioridad.nombre.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filter === 'prestador') {
      filteredTramites = filteredTramites.filter((tramite) =>
        tramite.prestadorDTO.nombre.toLowerCase().includes(search.toLowerCase())
      );
    } else if (filter === 'proyecto') {
      filteredTramites = filteredTramites.filter((tramite) =>
        tramite.prestadorDTO.proyecto.nombre
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    } else if (filter === 'prioridad') {
      filteredTramites = filteredTramites.filter((tramite) =>
        tramite.prioridad.nombre.toLowerCase().includes(search.toLowerCase())
      );
    }

    return filteredTramites;
  }
}
