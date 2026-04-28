import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../api/api.config';
import { LoanProduct } from './loan-products.data';

@Injectable({
  providedIn: 'root',
})
export class LoanProductsService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);

  findAll(): Observable<LoanProduct[]> {
    return this.http.get<LoanProduct[]>(`${this.apiBaseUrl}/loan-products`);
  }

  findBySlug(slug: string): Observable<LoanProduct> {
    return this.http.get<LoanProduct>(`${this.apiBaseUrl}/loan-products/${slug}`);
  }
}
