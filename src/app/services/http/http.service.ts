import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Methods } from './models/methods';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private hostAPI = 'https://localhost:7012/api/';

  constructor(private http: HttpClient) {}

  send<T>(
    type: Methods,
    url: string,
    payload: any = {}
  ): Observable<T> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let observable$;

    if (type === 'get')
      observable$ = this.http.get<T>(this.hostAPI + url, { headers });

    if (type === 'post')
      observable$ = this.http.post<T>(this.hostAPI + url, payload, { headers });

    if (type === 'put')
      observable$ = this.http.put<T>(this.hostAPI + url, payload != null ? payload : {}, {headers,});

    if (type === 'delete')
      observable$ = this.http.delete<T>(this.hostAPI + url, { headers });

    return observable$;
  }
}
