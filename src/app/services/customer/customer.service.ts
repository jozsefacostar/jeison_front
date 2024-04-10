import { CustomerDto } from 'src/app/models/customer/customer-dto';
import { HttpResponseType } from '../http/models/http-response-type';
import { HttpService } from '../http/http.service';
import { Injectable } from '@angular/core';
import { SaveCustomerPayload } from 'src/app/models/customer/save-customer-payload';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private _base: string = 'customer';
  private _baseCustomerType: string = 'customerType';

  constructor(
    private _http: HttpService
  ) { }
  
  /*  Función que registra a un cliente */
  saveCustomer(payload: any): HttpResponseType<any> {
    return this._http.send<any>('post', this._base, payload);
  }

  /*  Función que consulta todos los clientes */
  getAllCustomers(): HttpResponseType<any> {
    return this._http.send<any>('get', this._base);
  }

  /*  Función que consulta todos los tipos de clientes */
  getCustomerType(): HttpResponseType<any> {
    return this._http.send<any>('get', this._baseCustomerType);
  }
}
