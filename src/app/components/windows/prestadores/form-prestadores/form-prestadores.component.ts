import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PrestadorModel } from 'src/app/models/prestador.model';
import Swal from 'sweetalert2';
import { PrestadorDto } from '../../../../models/dto/prestador-dto';
import { ProyectoDto } from '../../../../models/dto/proyecto-dto';
import { Proyecto } from '../../../../models/proyecto';
import { PrestadorService } from '../../../../services/prestador.service';
import { ProyectoService } from '../../../../services/proyecto.service';

@Component({
  selector: 'app-form-prestadores',
  templateUrl: './form-prestadores.component.html',
  styleUrls: ['./form-prestadores.component.css'],
})
export class FormPrestadoresComponent implements OnInit {
  prestadores: PrestadorModel[] = [];

  proyectos: any[] = [];

  prestador: PrestadorDto = new PrestadorDto();
  proyecto: ProyectoDto = new ProyectoDto();

  nombre: string = '';
  apellido: string = '';
  email: string = '';
  proyectoAsignado: Proyecto = new Proyecto();
  idPrestador: number = 0;
  subscription: Subscription = new Subscription();
  prestadorSeleccionado: boolean = false;

  constructor(
    private _prestadorService: PrestadorService,
    private _proyectoService: ProyectoService,
    private _router: Router
  ) {
    this.subscription = this._prestadorService
      .getPrestadorSeleccionado()
      .subscribe((pres) => {
        this.idPrestador = pres.id_prestador;
        this.prestador.nombre = pres.nombre;
        this.prestador.apellidoP = pres.apellidoP;
        this.prestador.apellidoM = pres.apellidoM;
        this.prestador.correo = pres.correo;
        this.prestador.telefono = pres.telefono;
        this.prestador.id_proyecto = pres.proyecto.id;
        this.prestador.curp = pres.curp;
        this.prestador.actaNacimiento = pres.actaNacimiento;
        this.prestador.ine = pres.ine;
        this.prestador.eFirma = pres.eFirma;
        this.prestador.comprobanteDomicilio = pres.comprobanteDomicilio;
        this.prestador.cuentaBancaria = pres.cuentaBancaria;
        this.prestador.detalle = pres.detalle;
        this.prestadorSeleccionado = true;

        /* let nombreProyecto =
          this.proyectos.find((proyecto) =>
            proyecto.prestadoresDeServicio.includes(pres)
          )?.nombre || '';
        this.getProyecto(nombreProyecto); */
      });
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

  guardarPrestador() {
    if (!this.prestador.correo.includes('@infotec.com')) {
      Swal.fire({
        icon: 'error',
        title: 'El email ingresado no pertenece a Infotec',
        showConfirmButton: false,
        timer: 1500,
      }).then();
    } else {
      this._prestadorService.guardar(this.prestador).subscribe(
        (data) => {
          Swal.fire({
            icon: 'success',
            title: 'Prestador guardado con éxito',
            showConfirmButton: false,
            timer: 1500,
          }).then();
          window.location.reload();
          setTimeout(() => {
            this.limpiarFormulario();
            this.updateComponent();
          }, 100);
        },
        (error) => console.log(error)
      );
    }
  }

  actualizarPrestador() {
    if (!this.prestador.correo.includes('@infotec.com')) {
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
          this._prestadorService
            .actualizar(this.idPrestador, this.prestador)
            .subscribe((result) => {
              setTimeout(() => {
                this.limpiarFormulario();
                this.updateComponent();
              }, 100);
            });
          Swal.fire('¡Cambios guardados con éxito!', '', 'success');
        }
      });
    }
  }

  limpiarFormulario() {
    this.nombre = '';
    this.apellido = '';
    this.email = '';
  }

  updateComponent() {
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate(['Principal/prestadores']).then();
    });
  }

  ngOnInit() {
    this._prestadorService.getPrestadores().subscribe((prestadores) => {
      this.prestadores = prestadores;
    });

    this._proyectoService.getAllProyectos().subscribe((proyectos) => {
      this.proyectos = proyectos;
      console.log(this.proyectos);
    });
  }
}
