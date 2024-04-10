import { HttpResponseType } from '../http/models/http-response-type';
import { HttpService } from '../http/http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CancelProductService {

  private _base: string = 'CancelProduct';

  constructor(
    private _http: HttpService
  ) { }

   /*  Función que registra un producto financiero a un cliente */
   cancelProduct(payload: any): HttpResponseType<any> {
    return this._http.send<any>('post', this._base, payload);
  }

}
