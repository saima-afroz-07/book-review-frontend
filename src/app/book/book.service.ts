import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl: string = `${environment.apiUrl}api/books`;

  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getBook(id: string): Observable<any> {
    return this.http.get<any>(this.apiUrl+`/${id}`)
  }


}
