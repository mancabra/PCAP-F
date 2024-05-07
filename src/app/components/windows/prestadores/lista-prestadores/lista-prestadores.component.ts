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

  buscarPrestador() {
    let prestadoresFilter = this.prestadores.filter((prestador) => {
      return (
        prestador.nombre.toLowerCase() === this.busqueda.toLowerCase() ||
        prestador.nombre.toLowerCase() +
          ' ' +
          prestador.apellidoP.toLowerCase() ===
          this.busqueda.toLowerCase()
      );
    });
    this.prestadores = prestadoresFilter;
  }

  private updateComponent() {
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate(['Principal/prestadores']).then();
    });
  }
}
