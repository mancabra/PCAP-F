import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrestadorModel } from 'src/app/models/prestador.model';
import { PrestadorService } from 'src/app/services/prestador.service';
import { ProyectoService } from 'src/app/services/proyecto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prestador',
  templateUrl: './prestador.component.html',
  styleUrls: ['./prestador.component.css'],
})
export class PrestadorComponent implements OnInit {
  p: number = 1;
  prestadores: PrestadorModel[] = [];
  constructor(
    private _proyectoService: ProyectoService,
    private _prestadorService: PrestadorService,
    private _router: Router
  ) {}

  seleccionarPrestador(prestador: PrestadorModel) {
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
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this._prestadorService.eliminar(id).subscribe((data) => {
            Swal.fire('¡Prestador eliminado!', '', 'success').then();
            setTimeout(() => {
              this.updateComponent();
            }, 100);
          });
        }
      },
      (error) => console.log(error)
    );
  }

  private obtenerPrestadores() {
    this._prestadorService.getPrestadores().subscribe((data) => {
      this.prestadores = data;
      console.log(this.prestadores);
    });
  }

  private updateComponent() {
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate(['administrador']).then();
    });
  }

  ngOnInit() {
    this.obtenerPrestadores();
  }
}
