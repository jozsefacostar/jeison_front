import { HttpResponseType } from '../http/models/http-response-type';
import { HttpService } from '../http/http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FinancialProductService {

  private _base: string = 'FinancialProducts';

  constructor(
    private _http: HttpService
  ) { }

  /*  Función que consulta todos los clientes */
  getAllFinancialProductos(): HttpResponseType<any> {
    return this._http.send<any>('get', this._base);
  }

}
