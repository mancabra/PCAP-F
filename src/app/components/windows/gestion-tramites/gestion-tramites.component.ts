import { Component } from '@angular/core';
import { OnInit, OnDestroy } from "@angular/core";
import {GestionService} from "../../../services/gestion.service";
import {Proyecto} from "../../../models/proyecto";
import {Prestador} from "../../../models/prestador";

@Component({
  selector: 'app-gestion-tramites',
  templateUrl: './gestion-tramites.component.html',
  styleUrls: ['./gestion-tramites.component.css']
})
export class GestionTramitesComponent implements OnInit, OnDestroy {
  proyectos: Proyecto[] = [];
  prestadores: Prestador[] = [];
  idProyecto: number = 0;
  constructor(private _gestionService: GestionService) { }

  seleccionarProyecto(id: number) {
    this.idProyecto = id;
    setTimeout(() => {
      this._gestionService.getProyecto(id).subscribe(
        proyecto => this.prestadores = proyecto.prestadores
      )
    }, 100);
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
