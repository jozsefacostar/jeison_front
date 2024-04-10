import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TransactionDto as TransactionByClientDTO } from 'src/app/models/bank/transaction-dto';
import { IncomeTypeService } from 'src/app/services/backingTransaction/IncomeType.service';
import { BackingTransactionsService } from 'src/app/services/backingTransaction/backingTransactions.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { RelatedFinancialProductService } from 'src/app/services/relatedFinancialProduct/relatedFinancialProduct.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transactions-by-user',
  templateUrl: './transactions-by-user.component.html',
  styleUrls: ['./transactions-by-user.component.scss']
})
export class TransactionsByUserComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['financialProductDesc','concept', 'amount', 'code', 'dateTransaction'];
  dataSource: MatTableDataSource<TransactionByClientDTO>;
  transactionsByUserForm: FormGroup;
  customers: any[] = [];
  financialProducts: any[] = [];
  lstTypeIncome: any[] = [];
  backingTransactions: TransactionByClientDTO[] = []
  totalSumCustomer: number = 0;
  totalSumCA: number = 0;
  totalSumCC: number = 0;
  totalSumCDT: number = 0;
  nameCustomer: string = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fb: FormBuilder,
    private customerService: CustomerService,
    private incomeTypeService: IncomeTypeService,
    private backingtransaction: BackingTransactionsService,
    private relatedFinancialProduct: RelatedFinancialProductService,) {
    const data: Array<TransactionByClientDTO> = []
    this.dataSource = new MatTableDataSource(data);
  }

  ngOnInit(): void {
    this.transactionsByUserForm = this.fb.group({
      customer: ['', Validators.required],
      incomeCode: ['', Validators.required],
      financialProduct: ['', Validators.required],
      financialProductCode: [''],
      Amount: [null, [Validators.required, Validators.min(1), Validators.max(9999999999999)]],
    });
    this.getAllClients();
    this.lstTypeIncome = this.incomeTypeService.getAllIncomeTypes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /** Función que consulta los tipos de documentos de un cliente */
  async getAllClients() {
    await this.customerService.getAllCustomers().subscribe(res => {
      if (res.success)
        res.result.forEach((e: any) => this.customers.push(e));
    })
  }

  /** Función que se dispara con el botón de guardar */
  onSubmit() {
    if (this.transactionsByUserForm.valid) {
      this.backingtransaction.saveBackingTransaction(this.transactionsByUserForm.value).subscribe(response => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: response.message,
          showConfirmButton: false,
          timer: 1500
        });
        this.getTransactionsBYCustomer(this.transactionsByUserForm.value.customer)
      })
    }
  }

  /** Función que consulta los productos relacionados a un cliente */
  async getRelatedProductCustomer(customer: string) {
    this.financialProducts = [];
    await this.relatedFinancialProduct.getRelatedProductToCustomer('/GetFinancialProductsByCustomer/' + customer).subscribe(res => {

      if (res.success)
        res.result.forEach((e: any) => {
          if (e.code != 'CDT')
            this.financialProducts.push(e)
        });
      if (this.financialProducts?.length == 0)
      Swal.fire({
        position: "center",
        icon: "warning",
        title: 'El cliente seleccionado no tiene cuentas Débito ni Crédito',
        showConfirmButton: false,
        timer: 1500
      });
    })

  }

  // Función para manejar el cambio en la opción seleccionada
  onOpcionSeleccionadaChange(event: any) {
    // Obtén el objeto customerType seleccionado
    const selectedCustomerType = this.customers.find(customer => customer.id === event.value);
    this.nameCustomer = selectedCustomerType.name;
    this.getRelatedProductCustomer(selectedCustomerType.id)
    this.getTransactionsBYCustomer(selectedCustomerType.id)
  }

  // Función que consulta los movimientos de un cliente
  async getTransactionsBYCustomer(customer: string) {
    this.backingTransactions = []
    this.totalSumCustomer = 0;
    this.dataSource = new MatTableDataSource(this.backingTransactions);
    await this.backingtransaction.getAllBackingTransactions('/GetBackingTransactionByClient/' + customer).subscribe(res => {
   
      if (res.success && res.result.length > 0) {
        res.result.forEach((e: TransactionByClientDTO) => this.backingTransactions.push(e));
        this.dataSource = new MatTableDataSource(this.backingTransactions);
        this.totalSumCustomer = this.backingTransactions[0].total
        this.totalSumCC = this.backingTransactions[0].totalCC
        this.totalSumCA = this.backingTransactions[0].totalCA
        this.totalSumCDT = this.backingTransactions[0].totalCDT
      }
    });
  }

  // Función para manejar el cambio del tipo de producto financiero
  onChangeIncome(event: any) {
    // Obtén el objeto customerType seleccionado
    const financialProductCodecONTROL = this.financialProducts.find(product => product.id === event.value);
    const IncomeCodeControl = this.transactionsByUserForm.get('financialProductCode');
    IncomeCodeControl.setValue(financialProductCodecONTROL.code);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
