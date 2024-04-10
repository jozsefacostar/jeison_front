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

  loading: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private UserServicee: UserService,
    private general_Service: GeneralService) { }

  ngOnInit(): void {
    console.log('login')
    setTimeout(() => {
      this.loading = false;
    }, 1000);
    this.form = this.fb.group({
      NIT: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      Pass: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
    });
  }

  Login1(form: any) {
    this.Login(form)

  }

  async Login(form: any) {
    localStorage.setItem("login", "true")
    this.router.navigate([`/customer/list`])

    /*
        await this.UserServicee
          .Login(form.value)
          .then((res: any) => {
            this.loading = false;
            if (res.success) {
              this.general_Service.alert(res.message);
              console.log(res.result)
              this.setLocalStorage(res.result.ID, res.result.Name, res.result.ProfileCode);
              switch (res.result.ProfileCode) {
                case "ADMIN":
                  this.router.navigate([`./games`])
                  break;
                case "USER":
                  this.router.navigate([`./summary`])
                  break;
                default:
                  break;
              }
            }
            else this.general_Service.alert(res.message, 'error');
          })
          .catch((e) => (this.loading = false));
          */
  }

  setLocalStorage(idUser: string, name: string, perfil: string) {
    localStorage.setItem("idUser", idUser)
    localStorage.setItem("nameUser", name)
    localStorage.setItem("perfilUser", perfil)
  }
}



