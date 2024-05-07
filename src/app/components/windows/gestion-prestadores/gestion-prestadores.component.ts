import { Component } from '@angular/core';

import { OnInit } from '@angular/core';
import { TramiteDto } from 'src/app/models/dto/tramiteDto';
import { TramiteService } from 'src/app/services/tramite.service';

@Component({
  selector: 'app-gestion-prestadores',
  templateUrl: './gestion-prestadores.component.html',
  styleUrls: ['./gestion-prestadores.component.css'],
})
export class GestionPrestadoresComponent implements OnInit {
  p: number = 1;
  busqueda: string = '';
  tramites: TramiteDto[] = [];

  constructor(private _tramiteService: TramiteService) {}

  buscarPor() {
    let filtros = document.getElementById('dd-menu') as HTMLSelectElement;
    let filtroSeleccionado = filtros.value;

    if (filtroSeleccionado === 'prestador') {
      this.buscarPorPrestador(this.busqueda);
    } else if (filtroSeleccionado === 'proyecto') {
      this.buscarPorProyecto(this.busqueda);
    } else if (filtroSeleccionado === 'prioridad') {
      this.buscarPorPrioridad(this.busqueda);
    }
  }

  buscarPorProyecto(nombreProyecto: string) {
    let tramitesPorPrestador = this.tramites.filter((tramite) => {
      return (
        tramite.prestadorDTO.proyectoDTO.nombre.toLowerCase() ===
        nombreProyecto.toLowerCase()
      );
    });
    this.tramites = tramitesPorPrestador;
  }

  buscarPorPrioridad(prioridad: string) {
    let tramitesPorPrestador = this.tramites.filter((tramite) => {
      return tramite.prioridad.nombre.toLowerCase() === prioridad.toLowerCase();
    });
    this.tramites = tramitesPorPrestador;
  }

  buscarPorPrestador(nombrePrestador: string) {
    let tramitesPorPrestador = this.tramites.filter((tramite) => {
      return (
        tramite.prestadorDTO.nombre.toLowerCase() ===
        nombrePrestador.toLowerCase()
      );
    });
    this.tramites = tramitesPorPrestador;
  }

  quitarFiltro() {
    this.obtenerTramites();
    this.busqueda = '';

    const filtros = document.getElementById('dd-menu') as HTMLSelectElement;
    filtros.options[0].selected = true;
  }

  private obtenerTramites() {
    this._tramiteService.getTramites().subscribe((data) => {
      this.tramites = data;
    });
  }

  ngOnInit() {
    this.obtenerTramites();
  }
}
