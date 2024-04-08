import { Component } from '@angular/core';
import { GestionService } from '../../../services/gestion.service';

import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TramiteDto } from 'src/app/models/dto/tramiteDto';
import { PrestadorModel } from 'src/app/models/prestador.model';
import { TramiteService } from 'src/app/services/tramite.service';

@Component({
  selector: 'app-gestion-prestadores',
  templateUrl: './gestion-prestadores.component.html',
  styleUrls: ['./gestion-prestadores.component.css'],
})
export class GestionPrestadoresComponent implements OnInit {
  p: number = 1;
  busqueda: string = '';
  prestadores: Map<PrestadorModel, string> = new Map<PrestadorModel, string>();
  busquedaProyecto: Map<PrestadorModel, string> = new Map<
    PrestadorModel,
    string
  >();
  busquedaPrestador: Map<PrestadorModel, string> = new Map<
    PrestadorModel,
    string
  >();
  tramites: TramiteDto[] = [];

  constructor(
    private _tramiteService: TramiteService,
    private _gestionService: GestionService,
    private _router: Router
  ) {}

  buscarPor() {
    let filtros = document.getElementById('dd-menu') as HTMLSelectElement;
    let filtroSeleccionado = filtros.value;

    if (filtroSeleccionado === 'prestador') {
      this.buscarPorPrestador(this.busqueda);
    } else if (filtroSeleccionado === 'proyecto') {
      this.buscarPorProyecto(this.busqueda);
      this.busquedaPrestador = new Map<PrestadorModel, string>();
    }
  }

  buscarPorProyecto(nombreProyecto: string) {
    // Vaciar mapa de busqueda por proyecto
    this.busquedaProyecto = new Map<PrestadorModel, string>();

    // Buscar por nombre de proyecto
    this.prestadores.forEach((proyecto, prestador) => {
      if (proyecto.toLowerCase().includes(nombreProyecto.toLowerCase())) {
        this.busquedaProyecto.set(prestador, proyecto);
      }
    });
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
