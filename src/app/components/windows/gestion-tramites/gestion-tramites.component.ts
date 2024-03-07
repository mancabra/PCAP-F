import { Component } from '@angular/core';
import { OnInit, OnDestroy } from "@angular/core";
import {GestionService} from "../../../services/gestion.service";
import {Proyecto} from "../../../models/proyecto";
import {Prestador} from "../../../models/prestador";
import {Router} from "@angular/router";
import { ServiceService } from 'src/app/Service/service.service';

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
  listaTramites: any[]=[];

  constructor(private _gestionService: GestionService, private _router: Router,private _service:ServiceService) { }

  buscarPrestadores() {
    this.busquedaPrestadores = [];
    this.prestadores.forEach(prestador => {
      let nombreCompleto = prestador.nombre + " " + prestador.apellido;
      if (nombreCompleto.toLowerCase().includes(this.nombrePrestador.toLowerCase())) {
        this.busquedaPrestadores.push(prestador);
      }
    });
  }

  obtenerTramites(id:number){
    this._service.obtenerTamitesPorIdProyecto(id).subscribe(data=>{
      this.listaTramites=data;
    })
  }

  seleccionarProyecto(id: number) {
    this.idProyecto = id;
    this.obtenerTramites(id);
    setTimeout(() => {
      this._gestionService.getProyecto(id).subscribe(
        data => {
          this.prestadores = data.proyecto.prestadoresDeServicio;
        }
      )
    }, 100);
    this.busquedaPrestadores = [];
  }

  goToTramites(id: number) {
    this._gestionService.setTramiteID(id);
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
