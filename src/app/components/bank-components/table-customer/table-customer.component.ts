import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { AppState } from 'src/app/store/core/app-state.model';
import { CustomerDto } from 'src/app/models/customer/customer-dto';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { SubsManager } from 'src/app/common/utils/subs-manager';
import { bankRoot } from 'src/app/store/bank-state/bank-state.root.ts';
import { takeUntil } from 'rxjs';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-table-customer',
  templateUrl: './table-customer.component.html',
  styleUrls: ['./table-customer.component.scss']
})
export class TableCustomerComponent extends SubsManager implements OnInit, AfterViewInit {
 
  displayedColumns: string[] = ['name','identification','customerTypeNavigation', 'cellphone','legalRepresentativeName','legalRepresentativeNameIdentification'];
 
  dataSource: MatTableDataSource<CustomerDto>;
  customerss : CustomerDto [] = []


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private store: Store<AppState>,
    private customerService: CustomerService) {
    super();
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit(): void {
    this.getCustomers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

   /** Función que consulta los tipos de documentos de un cliente */
   async getCustomers() {
    await this.customerService.getAllCustomers().subscribe(res => {
      if (res.success)
        res.result.forEach((e: CustomerDto) => this.customerss.push(e));
        this.dataSource = new MatTableDataSource(this.customerss);
    })
  }
}
