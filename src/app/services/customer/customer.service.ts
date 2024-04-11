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
    console.log(payload)
    return this._http.send<any>('post', 'Persona/CrearPersona', payload);
  }

  /*  Función que consulta todos los clientes */
  getListPersons(): HttpResponseType<any> {
    return this._http.send<any>('get','Persona/ListarPersona');
  }
  /*  Función que consulta los tipos de identificación */
  getTypeIdentification(): HttpResponseType<any> {
    return this._http.send<any>('get', 'TipoIdentificacion/Listar');
  }
}
