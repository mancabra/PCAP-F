import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  opciones: string[] = [];
  abrirMenu: boolean = false;
  actual: string = '';
  ruta: string = '';

  subscription: Subscription;
  constructor(
    private _GeneralService: GeneralService,
    private router: Router,
    private authService: AuthService
  ) {
    this.subscription = _GeneralService.getWindow().subscribe((data) => {
      this.seleccionar(data.window, data.index);
      this.desplegar();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.opciones = [
      'Principal',
      'Generar',
      'Trámites',
      'Proyectos',
      'Calendario',
    ];
  }

  desplegar() {
    const boton = document.getElementsByName('btnMenu')[0];
    if (this.abrirMenu == false) {
      this.abrirMenu = true;
      boton.classList.add('btnMenuSeleccionado');

      setTimeout(() => {
        const menu = document.getElementsByName('menu')[0];
        menu.classList.add('mostrar');
      }, 10);
    } else if (this.abrirMenu == true) {
      boton.classList.remove('btnMenuSeleccionado');
      const menu = document.getElementsByName('menu')[0];
      menu.classList.remove('mostrar');
      setTimeout(() => {
        this.abrirMenu = false;
      }, 280);
    }
  }

  seleccionar(nombre: string, index: number) {
    const vector = document.getElementsByName('ventana');
    const ventana = document.getElementsByName('ventana')[index];
    const accesibilidad = document.getElementsByName('acces')[0];
    const avisosPrivacidad = document.getElementsByName('avisos')[0];

    if (this.actual == nombre) {
      this.desplegar();
    } else {
      this.actual = nombre;
    }

    if (this.abrirMenu == true) {
      vector.forEach((element) => {
        element.classList.remove('elegida');
      });
    }
    accesibilidad.classList.remove('elegida');
    avisosPrivacidad.classList.remove('elegida');

    if (index == 11) {
      avisosPrivacidad.classList.add('elegida');
    } else if (index == 12) {
      accesibilidad.classList.add('elegida');
    } else {
      ventana.classList.add('elegida');
    }

    this.paginas(nombre);
  }

  paginas(nombre: string) {
    if (nombre == 'Principal') {
      this.router.navigate(['Principal/avisos']);
    } else if (nombre == 'Generar') {
      this.router.navigate(['Principal/generar']);
    } else if (nombre == 'Trámites') {
      this.router.navigate(['Principal/tramites']);
    } else if (nombre == 'Proyectos') {
      this.router.navigate(['Principal/generar']);
    } else if (nombre == 'Calendario') {
      this.router.navigate(['Principal/generar']);
    } else if (nombre == 'Avisos') {
      this.router.navigate(['Principal/privacidad']);
    } else if (nombre == 'Accesibilidad') {
      this.router.navigate(['Principal/Accesibilidad']);
    }
  }

  cambiar(nombre: string, index: number) {
    this.ruta = nombre;
    const WINDOW = {
      window: nombre,
      index: index,
    };
    this._GeneralService.windowUpdate(WINDOW);

    setTimeout(() => {
      this.router.navigate([this.ruta]);
    }, 100);
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
  }
}
