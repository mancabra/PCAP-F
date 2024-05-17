import { Component } from '@angular/core';

import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TramiteDto } from 'src/app/models/dto/tramiteDto';
import { GestionService } from 'src/app/services/gestion.service';
import { TramiteService } from 'src/app/services/tramite.service';

@Component({
  selector: 'app-gestion-prestadores',
  templateUrl: './gestion-prestadores.component.html',
  styleUrls: ['./gestion-prestadores.component.css'],
})
export class GestionPrestadoresComponent implements OnInit {
  busqueda: string = '';
  page!: number;
  tramites: TramiteDto[] = [];
  filtro: string = '';
  items: number = 5;

  constructor(private _tramiteService: TramiteService, private _gestionService: GestionService, private _router: Router) { }

  private obtenerTramites() {
    let userObject = JSON.parse(localStorage.getItem('user') || '{}');
    let id_gestor = userObject.id_usuario;
    this._tramiteService.getTramites(id_gestor).subscribe((data) => {
      this.tramites = data;
    });
  }

  onSearchTramite(search: string) {
    this.page = 0;
    this.busqueda = search;
  }

  goToTramites(id: number) {
    this._gestionService.setTramiteID(id);
    this._router.navigate(['Principal/tramites/activos/proyecto/estatus']).then();
  }

  ngOnInit() {
    this.obtenerTramites();
  }
}
