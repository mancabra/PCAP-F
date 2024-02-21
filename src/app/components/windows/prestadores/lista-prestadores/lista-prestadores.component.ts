import {Component, OnInit} from '@angular/core';
import {ProyectoService} from "../../../../services/proyecto.service";
import {Router} from "@angular/router";
import {Prestador} from "../../../../models/prestador";
import {PrestadorService} from "../../../../services/prestador.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-lista-prestadores',
  templateUrl: './lista-prestadores.component.html',
  styleUrls: ['./lista-prestadores.component.css']
})
export class ListaPrestadoresComponent implements OnInit {
  p: number = 1;
  prestadores: Map<Prestador, string> = new Map<Prestador, string>();
  constructor(private _proyectoService: ProyectoService, private _prestadorService: PrestadorService, private _router: Router) {
  }

  seleccionarPrestador(prestador: Prestador) {
    this._prestadorService.seleccionar(prestador);
  }

  eliminarPrestador(id: number) {
    Swal.fire({
      icon: 'question',
      title: '¿Seguro que desea eliminar al prestador?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Eliminar',
      denyButtonText: 'Cancelar',
    }).then(result => {
      if (result.isConfirmed) {
        this._prestadorService.eliminar(id).subscribe(proyecto => {
          this._proyectoService.getProyectos().subscribe(proyectos => {
            this.prestadores.clear();
            proyectos.forEach(proyecto => {
              proyecto.prestadoresDeServicio.forEach(prestador => {
                this.prestadores.set(prestador, proyecto.nombre);
              });
            });
          });
        });
        Swal.fire('¡Prestador eliminado!', '', 'success').then();
      }
    });
  }

  ngOnInit() {
    this._proyectoService.getProyectos().subscribe(proyectos => {
      proyectos.forEach(proyecto => {
        proyecto.prestadoresDeServicio.forEach(prestador => {
          this.prestadores.set(prestador, proyecto.nombre);
        });
      });
    });
  }

}
