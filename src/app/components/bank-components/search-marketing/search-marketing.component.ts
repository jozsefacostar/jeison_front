import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TransactionDto as TransactionByClientDTO } from 'src/app/models/bank/transaction-dto';
import { BackingTransactionsService } from 'src/app/services/backingTransaction/backingTransactions.service';
import { FinancialProductService } from 'src/app/services/financialProduct/financialProduct.service';

@Component({
  selector: 'app-search-marketing',
  templateUrl: './search-marketing.component.html',
  styleUrls: ['./search-marketing.component.scss']
})
export class SearchMarketingComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['customer', 'total'];
  dataSource: MatTableDataSource<TransactionByClientDTO>;
  dataSourceTop10: MatTableDataSource<TransactionByClientDTO>;
  transactionsByUserForm: FormGroup;
  customers: any[] = [];
  financialProducts: any[] = [];
  lstTypeIncome: any[] = [];
  backingTransactions: any[] = []
  backingTransactionsTop10: any[] = []
  viewResult: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fb: FormBuilder,
    private backingtransaction: BackingTransactionsService,
    private financialProductsService: FinancialProductService) {
    const data: Array<TransactionByClientDTO> = []
    const dataTop10: Array<TransactionByClientDTO> = []
    this.dataSource = new MatTableDataSource(data);
    this.dataSourceTop10 = new MatTableDataSource(dataTop10);
  }

  ngOnInit(): void {
    this.transactionsByUserForm = this.fb.group({
      financialProduct: ['', Validators.required],
    });
    this.getAllFinancialProducts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSourceTop10.paginator = this.paginator;
    this.dataSourceTop10.sort = this.sort;
  }

  // Función para manejar el cambio del tipo de producto financiero
  async onChangeIncome(event: any) {
    /** Consulta de los productos por cliente */
    this.backingTransactions = []
    this.dataSource = new MatTableDataSource(this.backingTransactions);
    await this.backingtransaction.getAllBackingTransactions('/GetBackingTransactionByFinancialProduct/' + event.value).subscribe(res => {

      if (res.success && res.result.length > 0) {
        res.result.forEach((e: any) => this.backingTransactions.push(e));
        this.dataSource = new MatTableDataSource(this.backingTransactions);
      }
    });

    /** Consulta de Top 10 de clientes con mayor saldo en sus productos por tipo */

    this.backingTransactionsTop10 = []
    this.dataSourceTop10 = new MatTableDataSource(this.backingTransactionsTop10);
    await this.backingtransaction.getAllBackingTransactions('/Top10ClientsWithTheHighestBalance/' + event.value).subscribe(res => {
   
      if (res.success && res.result.length > 0) {
        res.result.forEach((e: any) => this.backingTransactionsTop10.push(e));
        this.dataSourceTop10 = new MatTableDataSource(this.backingTransactionsTop10);
      }
    });
    this.viewResult = true;
  }

  /** Función que consulta todos los productos */
  async getAllFinancialProducts() {
    await this.financialProductsService.getAllFinancialProductos().subscribe(res => {
      if (res.success)
        res.result.forEach((e: any) => this.financialProducts.push(e));
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
