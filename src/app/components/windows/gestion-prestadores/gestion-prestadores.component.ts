import {Component} from '@angular/core';
import {GestionService} from "../../../services/gestion.service";
import { Router } from "@angular/router";
import { OnInit } from "@angular/core";
import {Prestador} from "../../../models/prestador";
import {Tramite} from "../../../models/tramite";

@Component({
  selector: 'app-gestion-prestadores',
  templateUrl: './gestion-prestadores.component.html',
  styleUrls: ['./gestion-prestadores.component.css']
})
export class GestionPrestadoresComponent implements OnInit {
  p: number = 1;
  busqueda: string = "";
  prestadores: Map<Prestador, string> = new Map<Prestador, string>();
  busquedaProyecto: Map<Prestador, string> = new Map<Prestador, string>();
  busquedaPrestador: Map<Prestador, string> = new Map<Prestador, string>();

  constructor(private _gestionService: GestionService, private _router: Router) { }

  buscarPor() {
    let filtros = document.getElementById("dd-menu") as HTMLSelectElement;
    let filtroSeleccionado = filtros.value;

    if (filtroSeleccionado === 'prestador') {
      this.buscarPorPrestador(this.busqueda);
      this.busquedaProyecto = new Map<Prestador, string>;
      console.log(this.busquedaPrestador);
    } else if (filtroSeleccionado === 'proyecto') {
      this.buscarPorProyecto(this.busqueda);
      this.busquedaPrestador = new Map<Prestador, string>;
    }
  }

  buscarPorProyecto(nombreProyecto: string) {
    // Vaciar mapa de busqueda por proyecto
    this.busquedaProyecto = new Map<Prestador, string>();

    // Buscar por nombre de proyecto
    this.prestadores.forEach((proyecto, prestador) => {
      if (proyecto.toLowerCase().includes(nombreProyecto.toLowerCase())) {
        this.busquedaProyecto.set(prestador, proyecto);
      }
    });
  }

  buscarPorPrestador(nombrePrestador: string) {
    // Vaciar mapa de busqueda por prestador
    this.busquedaPrestador = new Map<Prestador, string>();

    // Buscar prestador
    this.prestadores.forEach((proyecto, prestador) => {
      let nombreCompleto = prestador.nombre + " " + prestador.apellido;
      if (nombreCompleto.toLowerCase().includes(nombrePrestador.toLowerCase())) {
        this.busquedaPrestador.set(prestador, proyecto);
      }
    });
  }

  quitarFiltro() {
    this.busquedaProyecto = new Map<Prestador, string>();
    this.busquedaPrestador = new Map<Prestador, string>();
    this.busqueda = "";

    const filtros = document.getElementById("dd-menu") as HTMLSelectElement;
    filtros.options[0].selected = true;
  }

  ngOnInit() {
    // Mapa de proyectos y prestadores
    setTimeout(() => {
      this._gestionService.getProyectos().subscribe(
        proyectos => {
          // Iteración sobre los proyectos
          proyectos.forEach(proyecto => {
            // Iteración sobre los prestadores de cada proyecto
            proyecto.prestadoresDeServicio.forEach(prestador => {
              if (prestador.tramites.length == 0) {
                let sinTramites = new Tramite();
                sinTramites.nombre = "Sin tramites activos";
                prestador.tramites = [sinTramites];
                this.prestadores.set(prestador, proyecto.nombre)
              } else {
                this.prestadores.set(prestador, proyecto.nombre)
              }
            });
          });
        }
      )
    }, 100);
  }
}
