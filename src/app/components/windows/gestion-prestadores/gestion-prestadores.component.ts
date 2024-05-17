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
  busqueda: string = '';
  page!: number;
  tramites: TramiteDto[] = [];
  filtro: string = '';
  items: number = 5;

  constructor(private _tramiteService: TramiteService) {}

  private obtenerTramites() {
    this._tramiteService.getTramites().subscribe((data) => {
      this.tramites = data;
    });
  }

  onSearchTramite(search: string) {
    this.page = 0;
    this.busqueda = search;
  }

  ngOnInit() {
    this.obtenerTramites();
  }
}
