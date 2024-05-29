import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrestadorDto } from 'src/app/models/dto/prestador-dto';
import { TramiteDto } from 'src/app/models/dto/tramiteDto';
import { PrestadorModel } from 'src/app/models/prestador.model';
import { TipoPrioridad } from 'src/app/models/tipoPrioridad';
import { TramiteRegistro } from 'src/app/models/tramiteRegistro';
import { PrestadorService } from 'src/app/services/prestador.service';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { TramiteService } from 'src/app/services/tramite.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil-prestador',
  templateUrl: './perfil-prestador.component.html',
  styleUrls: ['./perfil-prestador.component.css'],
})
export class PerfilPrestadorComponent implements OnInit {
  id!: number;
  tramites: TramiteDto[] = [];
  prestador: PrestadorModel = new PrestadorModel();
  prioridades: TipoPrioridad[] = [];
  idTramite: number = 0;
  tramite: TramiteRegistro = new TramiteRegistro();
  prestadorEdit: PrestadorDto = new PrestadorDto();
  proyectos: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private _TramiteService: TramiteService,
    private _proyectoService: ProyectoService,
    private _PrestadorService: PrestadorService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this._PrestadorService.getPrestador(this.id).subscribe(
      (prestador) => {
        this.prestador = prestador;
        this.cargarForm();
      },
      (error) => {
        console.log(error);
      }
    );
    this._TramiteService.getPrioridades().subscribe((data) => {
      this.prioridades = data;
    });

    this._proyectoService.getAllProyectos().subscribe((proyectos) => {
      this.proyectos = proyectos;
      console.log(this.proyectos);
    });

    this.obtenerTramites(this.id);
  }

  private obtenerTramites(id: number) {
    this._TramiteService.getTramitesPrestador(id).subscribe(
      (tramites) => {
        this.tramites = tramites;
      },
      (error) => {
        console.log(error);
      }
    );
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
              window.location.reload();
            }, 100);
          });
        }
      },
      (error) => console.log(error)
    );
  }

  guardarTramite() {
    this.tramite.idPrestador = this.prestador.id_prestador;
    this._TramiteService.guardar(this.tramite).subscribe(
      (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Prestador guardado con éxito',
          showConfirmButton: false,
          timer: 1500,
        }).then();

        setTimeout(() => {
          window.location.reload();
        }, 100);
      },
      (error) => console.log(error)
    );
  }

  seleccionarTramite(tramite: TramiteDto) {
    this._TramiteService.seleccionar(tramite);
  }

  documentosCompletos(): Boolean {
    return (
      this.prestador.curp &&
      this.prestador.actaNacimiento &&
      this.prestador.ine &&
      this.prestador.comprobanteDomicilio &&
      this.prestador.eFirma &&
      this.prestador.cuentaBancaria
    );
  }

  actualizarPrestador() {
    if (!this.prestadorEdit.correo.includes('@infotec.com')) {
      Swal.fire({
        icon: 'error',
        title: 'El email ingresado no pertenece a Infotec',
        showConfirmButton: false,
        timer: 1500,
      }).then();
    } else {
      Swal.fire({
        icon: 'question',
        title: '¿Deseas guardar los cambios?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Guardar',
        denyButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this._PrestadorService
            .actualizar(this.prestador.id_prestador, this.prestadorEdit)
            .subscribe((result) => {
              setTimeout(() => {
                window.location.reload();
              }, 100);
            });
          Swal.fire('¡Cambios guardados con éxito!', '', 'success');
        }
      });
    }
  }

  private cargarForm() {
    this.prestadorEdit.nombre = this.prestador.nombre;
    this.prestadorEdit.apellidoP = this.prestador.apellidoP;
    this.prestadorEdit.apellidoM = this.prestador.apellidoM;
    this.prestadorEdit.correo = this.prestador.correo;
    this.prestadorEdit.telefono = this.prestador.telefono;
    this.prestadorEdit.id_proyecto = this.prestador.proyecto.id;
    this.prestadorEdit.curp = this.prestador.curp;
    this.prestadorEdit.actaNacimiento = this.prestador.actaNacimiento;
    this.prestadorEdit.ine = this.prestador.ine;
    this.prestadorEdit.eFirma = this.prestador.eFirma;
    this.prestadorEdit.comprobanteDomicilio =
      this.prestador.comprobanteDomicilio;
    this.prestadorEdit.cuentaBancaria = this.prestador.cuentaBancaria;
    this.prestadorEdit.detalle = this.prestador.detalle;
  }
}
