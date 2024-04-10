import { HttpResponseType } from '../http/models/http-response-type';
import { HttpService } from '../http/http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RelatedFinancialProductService {

  private _base: string = 'RelatedFinancialProduct';

  constructor(
    private _http: HttpService
  ) { }

  /*  Función que registra un producto financiero a un cliente */
  saveFinancialProductCustomer(payload: any): HttpResponseType<any> {
    return this._http.send<any>('post', this._base, payload);
  }

  /*  Función que consulta los productos financieros relacionados a un cliente*/
  getRelatedProductToCustomer(parameters: any): HttpResponseType<any> {
    return this._http.send<any>('get', this._base + parameters);
  }

  /*  Función que consulta los productos financieros  de CDT prelacionados a un cliente para ser cancelados*/
  GetFinancialProductsCDTByCustomerForCancel(parameters: any): HttpResponseType<any> {
    return this._http.send<any>('get', this._base + parameters);
  }

  /*  Función que consulta  todos los productos financieros*/
  GetAllRelatedFinancialProductNotCanceled(parameters: any): HttpResponseType<any> {
    return this._http.send<any>('get', this._base + parameters);
  }
}
