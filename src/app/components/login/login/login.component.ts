import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general/general.service';
import { UserService } from 'src/app/services/user/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  flag: boolean = true;
  viewLogin = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private UserServicee: UserService,
    private general_Service: GeneralService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      NIT: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      Pass: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
    });
  }

  /** Función que dispara el Login */

  async Login(form: any) {
    var resultLogin = this.fieldValids(form);
    console.log(resultLogin)
    if (resultLogin) {
      this.general_Service.alert('Por favor ingrese los datos correctos', 'warning');
      return;
    }
    //TODO: Implementar consulta la backend -> User y Pass 
    var loginExitoso = true; //this.login(form)
    if (loginExitoso) {
      this.setLocalStorage();
      this.router.navigate([`/customer/list`])
    }
    else
      this.general_Service.alert('Usuario o contraseña incorrectos', 'warning');
  }

  /** Función que valida que los datos no sean vacios */
  fieldValids(form): boolean {
    console.log(form)
    if (!form.NIT || !form.Pass)
      return false;
    console.log(1)
    return true;
  }

  /** Función que guarda que el usuario se logueó exitosamente en el localstorage */
  setLocalStorage() {
    localStorage.setItem("login", "true")
  }

  /** Servicio que consulta las credenciales */
  async login(form: any): Promise<boolean> {
    try {
      const res: any = await this.UserServicee.Login(form.value);
      if (res.success) {
        this.general_Service.alert(res.message);
        return true;
      } else {
        this.general_Service.alert(res.message, 'error');
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}



