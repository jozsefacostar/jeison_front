import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { IndicativesServices } from 'src/app/services/customer/list-indicatives.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-form-customer',
  templateUrl: './form-customer.component.html',
  styleUrls: ['./form-customer.component.scss']
})
export class FormCustomerComponent implements OnInit {
  clienteForm: FormGroup;
  blockFields: boolean = false;

  customerTypes: any[] = [];
  lstIndicatives: any[] = [];
  constructor(private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private indicative: IndicativesServices) { } 

  ngOnInit() {
    this.clienteForm = this.fb.group({
      name: ['', Validators.required],
      identification:  [null, [Validators.required]], 
      customerType: ['', Validators.required],
      numericalndicative: ['', Validators.required],
      cellphone:  [null, [Validators.required]], 
      legalRepresentativeName: ['', Validators.required],
      legalRepresentativeNameIdentification: [null, [Validators.required]]
    });
    this.getDocumentType();
    this.lstIndicatives = this.indicative.getAllIndicatives()
  }

  async onSubmit() {
    if (this.clienteForm.valid) {
      await this.customerService.saveCustomer(this.clienteForm.value).subscribe(response => {
          Swal.fire({
            position: "center",
            icon: response.success ? "success" : "warning",
            title: response.message,
            showConfirmButton: false,
            timer: 1500
          });
      })

      setTimeout(() => {
        this.router.navigateByUrl('/customer/list')
      }, 1500);
    }
  }

  /** Función que consulta los tipos de documentos de un cliente */
  async getDocumentType() {
    await this.customerService.getCustomerType().subscribe(res => {
      if (res.success)
        res.result.forEach((e: any) => this.customerTypes.push(e));
    })
  }

  // Función para manejar el cambio en la opción seleccionada
  onOpcionSeleccionadaChange(event: any) {

    // Obtén el objeto customerType seleccionado
    const selectedCustomerType = this.customerTypes.find(customertype => customertype.id === event.value);

    
    const legalRepresentativeNameControl = this.clienteForm.get('legalRepresentativeName');    
    const legalRepresentativeNameIdentificationControl = this.clienteForm.get('legalRepresentativeNameIdentification');
    if (selectedCustomerType.code == 'EMP')
    {
      this.blockFields = true;
      // Aplica o quita el validador required según el valor de aplicarValidadorRequired
        legalRepresentativeNameControl.setValidators([Validators.required]);
        legalRepresentativeNameIdentificationControl.setValidators([Validators.required]);
    }else
    {

      legalRepresentativeNameControl.setValue('');
      legalRepresentativeNameIdentificationControl.setValue('');

      this.blockFields = false;
      legalRepresentativeNameControl.setValidators(null);
      legalRepresentativeNameIdentificationControl.setValidators(null);
      legalRepresentativeNameControl.updateValueAndValidity();
      legalRepresentativeNameIdentificationControl.updateValueAndValidity();
    }
  }
}
