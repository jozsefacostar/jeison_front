import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu-component.component.html',
  styleUrls: ['./menu-component.component.scss']
})
export class MenuComponentComponent {
  @Input() title: string = '';

  constructor(
    private router: Router) { }


  async logOut() {
   this.setLocalStorage();
  }

    /** Función que guarda que el usuario se logueó exitosamente en el localstorage */
    setLocalStorage() {
      localStorage.removeItem("login");
      this.router.navigate(['./auth/login']);
    }

}
