import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndicativesServices {
    public indicativos: { id: string; descripcion: string }[];
 

  /*  Función que consulta todos los indicativos */
  getAllIndicatives() {
    return this.indicativos = [
        { id: '57', descripcion: 'Colombia' },
        { id: '502', descripcion: 'Guatemala' },
        { id: '503', descripcion: 'El Salvador' },
        { id: '505', descripcion: 'Nicaragua' },
        { id: '506', descripcion: 'Costa Rica' },
        { id: '507', descripcion: 'Panamá' },
        { id: '54', descripcion: 'Argentina' },
        { id: '55', descripcion: 'Brasil' },
        { id: '56', descripcion: 'Chile' },
        { id: '58', descripcion: 'Venezuela' },
        { id: '51', descripcion: 'Perú' },
        { id: '591', descripcion: 'Bolivia' },
        { id: '593', descripcion: 'Ecuador' },
        { id: '595', descripcion: 'Paraguay' },
        { id: '598', descripcion: 'Uruguay' },
        { id: '1', descripcion: 'Estados Unidos' },
        { id: '52', descripcion: 'México' },
        { id: '44', descripcion: 'Reino Unido' },
        { id: '81', descripcion: 'Japón' },
        { id: '86', descripcion: 'China' }
      ];
  }
}
