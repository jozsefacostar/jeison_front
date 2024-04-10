import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IncomeTypeService {
    public indicativos: { id: string; descripcion: string }[];
 

  /*  Función que consulta todos los tipos de ingresos / egresos */
  getAllIncomeTypes() {
    return this.indicativos = [
        { id: 'DEB', descripcion: 'Débito' },
        { id: 'CRE', descripcion: 'Crédito' },
      ];
  }
}
