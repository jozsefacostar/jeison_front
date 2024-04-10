import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { AppState } from 'src/app/store/core/app-state.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { SubsManager } from 'src/app/common/utils/subs-manager';
import { RelatedFinancialProductService } from 'src/app/services/relatedFinancialProduct/relatedFinancialProduct.service';
import { RelatedFinancialProductDTO } from 'src/app/models/relatedfinancialproduct/relatedfinancialproduct';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectionDTO } from 'src/app/models/projection/projections';
import { BackingTransactionsService } from 'src/app/services/backingTransaction/backingTransactions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-projections',
  templateUrl: './projections.component.html',
  styleUrls: ['./projections.component.scss']
})
export class ProjectionsComponent extends SubsManager implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['customer', 'description', 'date'];
  displayedColumnsProjection: string[] = ['customer', 'amount', 'dateTransaction'];

  dataSource: MatTableDataSource<RelatedFinancialProductDTO>;
  relatedFinancialProducts: RelatedFinancialProductDTO[] = []
  backingTransactions: ProjectionDTO[] = []
  dataSourceProjection: MatTableDataSource<ProjectionDTO>;

  clienteForm: FormGroup;
  nameCustomer: string;
  product: string;
  viewSimulation: boolean = false;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fb: FormBuilder, private backingtransaction: BackingTransactionsService,
    private relatedFinancialProductsService: RelatedFinancialProductService) {
    super();
    this.dataSource = new MatTableDataSource([]);
    this.dataSourceProjection = new MatTableDataSource([]);
    this.clienteForm = this.fb.group({
      projectionDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getRelatedProductCDTForCancel();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;


    this.dataSourceProjection.paginator = this.paginator;
    this.dataSourceProjection.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Función que consulta los productos financieros  */
  async getRelatedProductCDTForCancel() {
    await this.relatedFinancialProductsService.GetAllRelatedFinancialProductNotCanceled('/GetAllRelatedFinancialProductNotCanceled').subscribe(res => {
      if (res.success)
        res.result.forEach((e: RelatedFinancialProductDTO) => this.relatedFinancialProducts.push(e));
      this.dataSource = new MatTableDataSource(this.relatedFinancialProducts);
    })
  }

  openDialog(row) {

    let miFecha = new Date();
    let mesActual = miFecha.getMonth();
    mesActual += 1;
    mesActual = (mesActual % 12) + 1;
    miFecha.setMonth(mesActual - 1);
    if (!this.clienteForm.valid) {
      this.viewSimulation = false;
      Swal.fire({
        position: "center",
        icon: "warning",
        title: 'Seleccione una fecha valida',
        showConfirmButton: false,
        timer: 1500
      });
    }
    else if (new Date(this.clienteForm.value.projectionDate) <= miFecha) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: 'Seleccione una fecha de proyección mayor',
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      this.viewSimulation = true;
      this.product = row.description;
      this.nameCustomer = row.customer
      this.CalculateSimulationFinancialProduct(this.clienteForm.value.projectionDate, row.id)
    }
  }

  // Función que concuslta la proyección de una cuenta bancaria
  async CalculateSimulationFinancialProduct(dateSelected, RelatedFinancialProduct) {
    this.backingTransactions = []
    this.dataSourceProjection = new MatTableDataSource(this.backingTransactions);
    var url = `/CalculateSimulationFinancialProduct?ProjectionDate=${dateSelected}&RelatedProductFinancial=${RelatedFinancialProduct}`;
    await this.backingtransaction.getAllBackingTransactions(url).subscribe(res => {
      if (res.success) {
        res.result.forEach((e: ProjectionDTO) => this.backingTransactions.push(e));
        this.dataSourceProjection = new MatTableDataSource(this.backingTransactions);
      }
      if (this.backingTransactions?.length == 0) {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: 'Seleccione una fechas posterior para calcular una simulación correcta',
          showConfirmButton: false,
          timer: 1500
        });
        this.viewSimulation = false;
      }
    });
  }
}
