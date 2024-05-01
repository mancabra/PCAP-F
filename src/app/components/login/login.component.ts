import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements AfterViewInit {
  pass: string = 'password';
  ruta: string = '../assets/eye-off.png';

  loginData = {
    correo: '',
    clave: '',
  };

  public loginValid = true;

  user = {
    mail: '',
    password: '',
  };
  mail: string = '';
  password: string = '';
  mailCheck: boolean = false;
  passwordCheck: boolean = false;
  error: string = '';
  errorMail: string = '';
  errorPass: string = '';

  ocultarInfo: boolean = true;

  constructor(private router: Router, private _authService: AuthService) {}
  ngAfterViewInit(): void {}

  ngOnInit(): void {}

  mostrar() {
    const Info = document.getElementsByName('info')[0];
    if (this.ocultarInfo == true) {
      Info.classList.add('mostarInfo');
      setTimeout(() => {
        this.ocultarInfo = false;
      }, 150);

      setTimeout(() => {
        this.ocultarInfo = true;
        Info.classList.remove('mostarInfo');
      }, 3000);
    } else {
      this.ocultarInfo = true;
      setTimeout(() => {
        Info.classList.remove('mostarInfo');
      }, 1);
    }
  }

  log() {
    this.error = '';
    this.errorMail = '';
    this.errorPass = '';

    this.mailCheck = true;
    this.passwordCheck = true;

    const USER = {
      correo: this.mail,
      password: this.password,
    };

    this.checkMail(USER);
  }

  checkMail(user: any) {
    if (user.correo == '') {
      this.error = 'Ambos campos son obligatorios';
      this.mailCheck == false;
    } else {
      this.mailCheck = user.correo.includes('@infotec.com');
      if (this.mailCheck == false) {
        this.errorMail = 'El correo ingresado no pertenece a Infotec';
      }
    }
    this.checkPass(user);
  }

  checkPass(user: any) {
    if (user.password == '') {
      this.error = 'Ambos campos son obligatorios';
      this.passwordCheck = false;
    } else {
      if (user.password.length < 8) {
        this.errorPass = 'La contraseña debe tener como mínimo 8 caracteres';
        this.passwordCheck = false;
      }
    }
    //this.logSecurity(user);
    //this.enter(user);
  }

  formSubmit() {
    this._authService.authUsuario(this.loginData).subscribe(
      (data: any) => {
        this.loginValid = true;
        this._authService.loginUsuario(data.token);

        this._authService.usuarioActual().subscribe((user: any) => {
          this._authService.setUsuario(user);

          if (this._authService.getRole() == 'GESTOR') {
            this.router.navigate(['Principal/avisos']);
            this._authService.loginStatus.next(true);
          }
          if (this._authService.getRole() == 'ADMINISTRADOR') {
            this.router.navigate(['administrador']);
            this._authService.loginStatus.next(true);
          }
        });
      },
      (error) => (this.loginValid = false)
    );
  }

  validarError() {
    if (this.error == '') {
      if (this.errorMail == '') {
        alert(this.errorPass);
      } else {
        alert(this.errorMail);
      }
    } else {
      alert(this.error);
    }
  }

  mostrarPas() {
    if (this.pass == 'password') {
      this.ruta = '../assets/eye.png';
      this.pass = 'text';
    } else {
      this.ruta = '../assets/eye-off.png';
      this.pass = 'password';
    }
  }
}
