import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../models/review';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private apiUrl: string = `${environment.apiUrl}api/reviews`;

  constructor(private http: HttpClient) { }

  getAllReviews(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getReview(id: string): Observable<Review>{
    return this.http.get<Review>(this.apiUrl+`/${id}`);
  }

  createReview(review: Review): Observable<void>{
    return this.http.post<void>(this.apiUrl, review)
  }

  updateReview(id: string, updateReview: any): Observable<void> {
    return this.http.put<void>(this.apiUrl+`/${id}`, updateReview);
  }

  deleteReview(id: string): Observable<void>{
    return this.http.delete<void>(this.apiUrl+`/${id}`)
  }
}
