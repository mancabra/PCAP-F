import { Component } from '@angular/core';
import {GestionService} from "../../../services/gestion.service";
import { Router } from "@angular/router";
import { OnInit } from "@angular/core";
import {Prestador} from "../../../models/prestador";

@Component({
  selector: 'app-gestion-prioridad',
  templateUrl: './gestion-prioridad.component.html',
  styleUrls: ['./gestion-prioridad.component.css']
})
export class GestionPrioridadComponent implements OnInit {
  p: number = 1;
  busqueda: string = "";
  prestadores: Prestador[] = [];
  busquedaPrestador: Prestador[] = [];
  busquedaTramite: Prestador[] = [];

  constructor(private _gestionService: GestionService, private _router: Router) {
  }

  buscarPor() {
    this.busquedaPrestador = [];
    this.busquedaTramite = [];

    let filtros = document.getElementById("dd-menu") as HTMLSelectElement;
    let filtroSeleccionado = filtros.value;

    if (filtroSeleccionado === 'prestador') {
      this.buscarPorPrestador(this.busqueda);
      this.busquedaTramite = [];
    } else if (filtroSeleccionado === 'tramite') {
      this.buscarPorTramite(this.busqueda);
      this.busquedaPrestador = [];
    }
  }

  buscarPorPrestador(nombre: string) {
    this.prestadores.forEach(prestador => {
      let nombreCompleto = prestador.nombre + " " + prestador.apellido;
      if (nombreCompleto.toLowerCase().includes(nombre.toLowerCase())) {
        this.busquedaPrestador.push(prestador);
      }
    });

    this.busquedaPrestador = this.busquedaPrestador.sort((p1, p2) => {
      let fecha1 = new Date(p1.tramites[0].fechaLimite);
      let fecha2 = new Date(p2.tramites[0].fechaLimite);
      return fecha1.getTime() - fecha2.getTime();
    });
  }

  buscarPorTramite(tramite: string) {
    this.prestadores.forEach(prestador => {
      let tramitePrestador = prestador.tramites[0].nombre;
      if (tramitePrestador.toLowerCase().includes(tramite.toLowerCase())) {
        this.busquedaTramite.push(prestador);
      }
    });

    this.busquedaPrestador = this.busquedaPrestador.sort((p1, p2) => {
      let fecha1 = new Date(p1.tramites[0].fechaLimite);
      let fecha2 = new Date(p2.tramites[0].fechaLimite);
      return fecha1.getTime() - fecha2.getTime();
    });
  }

  quitarFiltro() {
    this.busqueda = "";
    this.busquedaPrestador = [];
    this.busquedaTramite = [];

    const filtros = document.getElementById('dd-menu') as HTMLSelectElement;
    filtros.options[0].selected = true;
  }

  checkTextoPrioridad(prioridad: number): string {
    if (prioridad == 2) {
      return "#F7F7F7"
    } else if (prioridad == 1) {
      return "#F7F7F7"
    } else {
      return "#BC955C"
    }
  }

  checkColorPrioridad(prioridad: number): string {
    if (prioridad == 2) {
      return "rgb(147, 46, 66)"
    } else if (prioridad == 1) {
      return "rgb(151, 121, 77)"
    } else {
      return "rgb(247, 247, 247)"
    }
  }

  checkPrioridad(prioridad: number): string {
    if (prioridad == 2) {
      return "Alta"
    } else if (prioridad == 1) {
      return "Media"
    } else {
      return "Baja"
    }
  }

  /*checkPrioridad() {
    let prior = document.querySelectorAll(".prioridad");
    prior.forEach(priorVal => {
      if (priorVal.innerHTML.includes("2")) {
        priorVal.setAttribute('style', 'background-color: rgb(147, 46, 66);' +
          'color: #F7F7F7;');
      } else if (priorVal.innerHTML.includes("1")) {
        priorVal.setAttribute('style', 'background-color: rgb(151, 121, 77);' +
          'color: #F7F7F7;');
      } else {
        priorVal.setAttribute('style', 'background-color: #F7F7F7;' +
          'border: 1px solid rgb(151, 121, 77);');
      }
    });
  }

   */

  ngOnInit() {
    setTimeout(() => {
      this._gestionService.getPrestadores().subscribe(
        prestadores => {
          let listaPrestadores: Prestador[] = [];
          prestadores.forEach(prestador => {
            if (prestador.tramites.length > 0) {
              listaPrestadores.push(prestador);
            }
          });
          this.prestadores = listaPrestadores.sort((p1, p2) => {
            let fecha1 = new Date(p1.tramites[0].fechaLimite);
            let fecha2 = new Date(p2.tramites[0].fechaLimite);
            return fecha1.getTime() - fecha2.getTime();
          });
        }
      )
    }, 100);
  }
}
