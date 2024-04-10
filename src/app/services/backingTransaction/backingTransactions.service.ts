import { CustomerDto } from 'src/app/models/customer/customer-dto';
import { HttpResponseType } from '../http/models/http-response-type';
import { HttpService } from '../http/http.service';
import { Injectable } from '@angular/core';
import { SaveCustomerPayload } from 'src/app/models/customer/save-customer-payload';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackingTransactionsService {

  private _base: string = 'BackingTransaction';

  constructor(
    private _http: HttpService
  ) { }

  /*  Función que registra a un cliente */
  saveBackingTransaction(payload: any): HttpResponseType<any> {
    return this._http.send<any>('post', this._base, payload);
  }

  /*  Función que consulta  las transacciones bancarias al usuario */
  getAllBackingTransactions(parameters: any): HttpResponseType<any> {
    return this._http.send<any>('get', this._base + parameters);
  }

  /*  Función que consulta las proyecciones */
  CalculateSimulationFinancialProduct(parameters: any): HttpResponseType<any> {
    return this._http.send<any>('get', this._base + parameters);
  }


}
