import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderType } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }
  url = 'https://minizuba-fn.azurewebsites.net/api/orderlines';
  getOrderLines(type_id: number): Observable<OrderType[]> {
    let params = new HttpParams();
    params = params.set('type_id', type_id.toString());
    return this.http.get<OrderType[]>(this.url, { params });
  }
}
