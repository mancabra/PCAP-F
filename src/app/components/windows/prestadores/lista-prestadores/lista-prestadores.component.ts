import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { PrestadorModel } from 'src/app/models/prestador.model';
import { PrestadorService } from '../../../../services/prestador.service';

@Component({
  selector: 'app-lista-prestadores',
  templateUrl: './lista-prestadores.component.html',
  styleUrls: ['./lista-prestadores.component.css'],
})
export class ListaPrestadoresComponent implements OnInit {
  p: number = 1;
  prestadores: PrestadorModel[] = [];
  busqueda: string = '';
  page!: number;
  items: number = 10;

  constructor(
    private _prestadorService: PrestadorService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.obtenerPrestadores();
  }

  seleccionarPrestador(prestador: PrestadorModel) {
    this._prestadorService.seleccionar(prestador);
  }

  private obtenerPrestadores() {
    this._prestadorService.getPrestadores().subscribe((data) => {
      this.prestadores = data;
      console.log(this.prestadores);
    });
  }

  private updateComponent() {
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate(['Principal/prestadores']).then();
    });
  }

  onSearchPrestador(search: string) {
    this.page = 0;
    this.busqueda = search;
  }
}
