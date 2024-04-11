import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer/customer.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-form-customer',
  templateUrl: './form-customer.component.html',
  styleUrls: ['./form-customer.component.scss']
})
export class FormCustomerComponent implements OnInit {
  clienteForm: FormGroup;

  customerTypes: any[] = [];
  constructor(private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router) { }

  ngOnInit() {
    this.clienteForm = this.fb.group({
      idTipoIdentificacion: ['', Validators.required],
      identificacion: [null, [Validators.required, Validators.pattern('^[0-9]+$')]],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: [null, [Validators.required, Validators.email]],
    });
    this.getDocumentType();
  }

  async onSubmit() {
    if (this.clienteForm.valid) {
      await this.customerService.saveCustomer(this.clienteForm.value).subscribe(response => {
       
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Persona creada con éxito",
          showConfirmButton: false,
          timer: 1000
        });
       setTimeout(() => {
        this.router.navigateByUrl('/customer/list')
      }, 1100);
      })
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Error al guardar",
        showConfirmButton: false,
        timer: 1000
      });
    }
  }

  /** Función que consulta los tipos de documentos de un cliente */
  async getDocumentType() {
    await this.customerService.getTypeIdentification().subscribe(res => {
      res.forEach((e: any) => this.customerTypes.push(e));
    })
  }
}
