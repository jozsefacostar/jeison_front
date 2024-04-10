import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CancelProductService } from 'src/app/services/cancel/cancel.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { FinancialProductService } from 'src/app/services/financialProduct/financialProduct.service';
import { RelatedFinancialProductService } from 'src/app/services/relatedFinancialProduct/relatedFinancialProduct.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.scss']
})
export class CancelComponent implements OnInit {
  relatedFinancialProduct: FormGroup;
  cancelFinancialCDT: FormGroup;

  customers: any[] = [];
  financialProducts: any[] = [];
  viewPercent: boolean = false;
  constructor(private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private relatedFinancialProductsService: RelatedFinancialProductService,
    private cancelProduct: CancelProductService
  ) { }

  ngOnInit() {
    this.relatedFinancialProduct = this.fb.group({
      customer: ['', Validators.required],
      financialProduct: ['', Validators.required]
    });
    this.getAllClients();
  }

  onSubmit() {
    if (this.relatedFinancialProduct.valid) {
      this.cancelProduct.cancelProduct(this.relatedFinancialProduct.value).subscribe(response => {
        Swal.fire({
          position: "center",
          icon: response.success ? "success" : "error",
          title: response.message,
          showConfirmButton: false,
          timer: 1500
        });

        if (response.success)
          setTimeout(() => {
            this.router.navigate(['/bank/transactions']);
          }, 1500);
      })
    }
  }

  /** Función que consulta los tipos de documentos de un cliente */
  async getAllClients() {
    await this.customerService.getAllCustomers().subscribe(res => {
      if (res.success)
        res.result.forEach((e: any) => this.customers.push(e));
    })
  }

  /** Función que consulta todos los productos */
  async getRelatedProductCDTForCancel(customer: string) {
    await this.relatedFinancialProductsService.GetFinancialProductsCDTByCustomerForCancel('/GetFinancialProductsCDTByCustomerForCancel/' + customer).subscribe(res => {
      this.financialProducts = []
      if (res.success)
        res.result.forEach((e: any) => this.financialProducts.push(e));
      else
        Swal.fire({
          position: "center",
          icon: res.success ? "success" : "warning",
          title: res.message,
          showConfirmButton: false,
          timer: 1500
        });
    })
  }

  // Función para manejar el cambio en la opción seleccionada
  changeSelectCustomer(event: any) {
    // Obtén el objeto customerType seleccionado
    const selectedCustomerType = this.customers.find(customer => customer.id === event.value);
    this.getRelatedProductCDTForCancel(selectedCustomerType.id)
  }

}