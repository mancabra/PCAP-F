import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PrestadorModel } from 'src/app/models/prestador.model';
import { TipoPrioridad } from 'src/app/models/tipoPrioridad';
import { TramiteRegistro } from 'src/app/models/tramiteRegistro';
import { PrestadorService } from 'src/app/services/prestador.service';
import { TramiteService } from 'src/app/services/tramite.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-tramite',
  templateUrl: './form-tramite.component.html',
  styleUrls: ['./form-tramite.component.css'],
})
export class FormTramiteComponent {
  subscription: Subscription = new Subscription();
  prestadores: PrestadorModel[] = [];
  prioridades: TipoPrioridad[] = [];
  idTramite: number = 0;
  tramite: TramiteRegistro = new TramiteRegistro();
  tramiteSeleccionado: Boolean = false;

  constructor(
    private _TramiteService: TramiteService,
    private _prestadorService: PrestadorService,
    private _router: Router
  ) {
    this.subscription = this._TramiteService
      .getPrestadorSeleccionado()
      .subscribe((tram) => {
        this.idTramite = tram.id;
        this.tramite.nombre = tram.nombre;
        this.tramite.descripcion = tram.descripcion;
        this.tramite.fechaLimite = tram.fechaLimite;
        this.tramite.idPrestador = tram.prestadorDTO.id_prestador;
        this.tramite.prioridad = tram.prioridad;
        this.tramiteSeleccionado = true;
      });
  }

  ngOnInit() {
    this._prestadorService.getPrestadores().subscribe((prestadores) => {
      this.prestadores = prestadores;
    });

    this._TramiteService.getPrioridades().subscribe((data) => {
      this.prioridades = data;
      console.log(this.prioridades);
    });
  }

  updateComponent() {
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate(['Principal/tramites/gestion']).then();
    });
  }

  guardarTramite() {
    this._TramiteService.guardar(this.tramite).subscribe(
      (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Prestador guardado con éxito',
          showConfirmButton: false,
          timer: 1500,
        }).then();

        setTimeout(() => {
          this.updateComponent();
        }, 100);
      },
      (error) => console.log(error)
    );
  }

  actualizarTramite() {
    Swal.fire({
      icon: 'question',
      title: '¿Deseas guardar los cambios?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Guardar',
      denyButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this._TramiteService
          .actualizar(this.idTramite, this.tramite)
          .subscribe((result) => {
            Swal.fire('¡Cambios guardados con éxito!', '', 'success');
            setTimeout(() => {
              this.updateComponent();
            }, 100);
          }),
          (error: any) => console.log(error);
      }
    });

    console.log(this.tramite);
  }
}
