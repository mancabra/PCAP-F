import { Component } from '@angular/core';
import { OnInit, OnDestroy } from "@angular/core";
import {GestionService} from "../../../services/gestion.service";
import {Proyecto} from "../../../models/proyecto";
import {Prestador} from "../../../models/prestador";
import {Router} from "@angular/router";

@Component({
  selector: 'app-gestion-tramites',
  templateUrl: './gestion-tramites.component.html',
  styleUrls: ['./gestion-tramites.component.css']
})
export class GestionTramitesComponent implements OnInit, OnDestroy {
  proyectos: Proyecto[] = [];
  prestadores: Prestador[] = [];
  busquedaPrestadores: Prestador[] = [];
  idProyecto: number = 0;
  nombrePrestador: string = "";

  constructor(private _gestionService: GestionService, private _router: Router) { }

  buscarPrestadores() {
    this.busquedaPrestadores = [];
    this.prestadores.forEach(prestador => {
      let nombreCompleto = prestador.nombre + " " + prestador.apellido;
      if (nombreCompleto.toLowerCase().includes(this.nombrePrestador.toLowerCase())) {
        this.busquedaPrestadores.push(prestador);
      }
    });
  }
  seleccionarProyecto(id: number) {
    this.idProyecto = id;
    setTimeout(() => {
      this._gestionService.getProyecto(id).subscribe(
        proyecto => {
          this.prestadores = proyecto.prestadoresDeServicio;
        }
      )
    }, 100);
    this.busquedaPrestadores = [];
  }

  goToTramites(id: number) {
    this._gestionService.setPrestadorID(id);
    this._router.navigate(['Principal/tramites/activos/proyecto/estatus']).then();
  }

  ngOnInit() {
    setTimeout(() => {
      this._gestionService.getProyectos().subscribe(
        proyectos => this.proyectos = proyectos
      )
    }, 100);
  }

  ngOnDestroy() {
  }

}
