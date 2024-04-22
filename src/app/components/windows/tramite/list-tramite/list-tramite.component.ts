import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TramiteDto } from 'src/app/models/dto/tramiteDto';
import { TramiteService } from 'src/app/services/tramite.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-tramite',
  templateUrl: './list-tramite.component.html',
  styleUrls: ['./list-tramite.component.css'],
})
export class ListTramiteComponent implements OnInit {
  tramites: TramiteDto[] = [];

  constructor(
    private _TramiteService: TramiteService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerTramites();
  }

  private obtenerTramites() {
    this._TramiteService.getTramites().subscribe((data) => {
      this.tramites = data;
      console.log(data);
    });
  }

  seleccionarTramite(tramite: TramiteDto) {
    this._TramiteService.seleccionar(tramite);
  }

  eliminarTramite(id: number) {
    Swal.fire({
      icon: 'question',
      title: '¿Seguro que desea eliminar el tramite?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Eliminar',
      denyButtonText: 'Cancelar',
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this._TramiteService.eliminar(id).subscribe((data) => {
            Swal.fire('¡Tramite eliminado!', '', 'success').then();
            setTimeout(() => {
              this.updateComponent();
            }, 100);
          });
        }
      },
      (error) => console.log(error)
    );
  }

  private updateComponent() {
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate(['Principal/tramites/gestion']).then();
    });
  }
}
