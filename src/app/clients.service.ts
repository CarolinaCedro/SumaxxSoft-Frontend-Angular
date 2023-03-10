import { Injectable } from '@angular/core';
import { Client } from './clients/client';
import { ClientResponse } from './clients/client';
import { map } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(
    private http: HttpClient
  ) { }
  save(client:Client):Observable<any>{
    return this.http.post<Client>('http://localhost:8080/api/clients',client)
  }

  update(client:Client):Observable<any>{
    return this.http.put<Client>(`http://localhost:8080/api/clients/${client.id}`,client)
  }

  delete(client:Client):Observable<any>{
    return this.http.delete<Client>(`http://localhost:8080/api/clients/${client.id}`)
  }
  
  getClients(): Observable<Client[]> {
    return this.http.get<ClientResponse>('http://localhost:8080/api/clients')
    .pipe(map(response => response.content));
}
  

  getClientById(id:number):Observable<Client>{
    return this.http.get<any>(`http://localhost:8080/api/clients/${id}`);
  }


}
