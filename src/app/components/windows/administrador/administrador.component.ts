import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css'],
})
export class AdministradorComponent {
  activeButton: string = 'Productos';
  show: string = 'Productos';
  listOrdenes!: Array<any>;
  status!: string;
  ordenDetail!: any;
  idOrden!: number;
  statusOrden!: string;

  constructor(private router: Router) {}

  isActive(buttonText: string): boolean {
    return this.activeButton === buttonText;
  }

  setActive(buttonText: string): void {
    this.activeButton = buttonText;
    this.show = buttonText;
  }
  cerrarSesion() {
    this.router.navigate(['home']);
  }
}
