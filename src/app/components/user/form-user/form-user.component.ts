import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general/general.service';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {
  clienteForm: FormGroup;
  blockFields: boolean = false;

  customerTypes: any[] = [];
  lstIndicatives: any[] = [];
  constructor(private fb: FormBuilder,
    private userService: UserService,
    private general_Service: GeneralService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.clienteForm = this.fb.group({
      usuario: [null, [Validators.required, Validators.email]],
      pass: [null, [Validators.required]]
    });
  }

  async onSubmit() {
    if (this.clienteForm.valid) {
      /** Servicio que crea un usuario */
      await this.userService
        .CreateUser(this.clienteForm.value)
        .then((res: any) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Usuario creado con éxito",
            showConfirmButton: false,
            timer: 1000
          });
          setTimeout(() => {
            this.router.navigateByUrl('/customer/list')
          }, 1100);
        })
        .catch((e) => {
          console.log(e)
          this.general_Service.alert(e?.error?.message, 'warning');
        });
    }
  }
}
