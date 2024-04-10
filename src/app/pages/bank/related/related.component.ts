import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { FinancialProductService } from 'src/app/services/financialProduct/financialProduct.service';
import { RelatedFinancialProductService } from 'src/app/services/relatedFinancialProduct/relatedFinancialProduct.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-related',
  templateUrl: './related.component.html',
  styleUrls: ['./related.component.scss']
})
export class RelatedComponent implements OnInit {
  relatedFinancialProduct: FormGroup;

  customers: any[] = [];
  financialProducts: any[] = [];
  viewPercent: boolean = false;
  constructor(private fb: FormBuilder,
    private customerService: CustomerService,
    private financialProductsService: FinancialProductService,
    private relatedFinancialProductsService: RelatedFinancialProductService
  ) { }

  ngOnInit() {
    this.relatedFinancialProduct = this.fb.group({
      customer: ['', Validators.required],
      financialProduct: ['', Validators.required],
      AmountInitial: ['', [Validators.required, Validators.min(0)]],
      CutDateProduct: [null, Validators.required],
      montlyCDTPercent: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      codeFinancialProduct: ['', Validators.required],
    });
    this.getAllClients();
    this.getAllFinancialProducts();
  }

  onSubmit() {
    if (this.relatedFinancialProduct.valid) {
      this.relatedFinancialProductsService.saveFinancialProductCustomer(this.relatedFinancialProduct.value).subscribe(response => {
        Swal.fire({
          position: "center",
          icon: response.success ? "success" :"warning",
          title: response.message,
          showConfirmButton: false,
          timer: 1500
        });
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
  async getAllFinancialProducts() {
    await this.financialProductsService.getAllFinancialProductos().subscribe(res => {
      if (res.success)
        res.result.forEach((e: any) => this.financialProducts.push(e));
    })
  }

  // Función para manejar el cambio en la opción seleccionada
  onOpcionSeleccionadaChange(event: any) {
    const finalProduct = this.financialProducts.find(financialProducts => financialProducts.id === event.value);
    this.relatedFinancialProduct.get('codeFinancialProduct').setValue(finalProduct.code);
    const montlyCDTPercentControl = this.relatedFinancialProduct.get('montlyCDTPercent');

    const AmountInitialControl = this.relatedFinancialProduct.get('AmountInitial');
    if (finalProduct.code == 'CDT') {
      this.viewPercent = true;
      montlyCDTPercentControl.setValidators([Validators.required]);
      montlyCDTPercentControl.updateValueAndValidity();
      AmountInitialControl.setValidators([Validators.required, Validators.min(1)]);
      AmountInitialControl.updateValueAndValidity();
    } else {
      AmountInitialControl.setValue(null);
      AmountInitialControl.setValidators([Validators.required, Validators.min(0)]);
      AmountInitialControl.updateValueAndValidity();
      montlyCDTPercentControl.setValue(0);
      montlyCDTPercentControl.setValidators(null);
      montlyCDTPercentControl.updateValueAndValidity();
      this.viewPercent = false;
    }
    /** Si es CC, se almacena 0 */
    if (finalProduct.code == 'CC')
      montlyCDTPercentControl.setValue(0);
    /** Si es CA, se almacena 4 */
    if (finalProduct.code == 'CA')
      montlyCDTPercentControl.setValue(4);
  }
}