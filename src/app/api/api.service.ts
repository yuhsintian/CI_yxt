import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BaseUrl: string = 'http://localhost:4200/authority/v1.0';
  constructor(private http: HttpClient) { }
//加上回傳值page並設定limit為20
getAllRequest(page: number): Observable<any> {
  const url = this.BaseUrl + '?page=' + page + '&limit=20';
  return this.http.get(url);
}

//post
postRequest(body: any): Observable<any> {
  const url = `${this.BaseUrl}`;
  return this.http.post(url, body);
}

// getOne
getOneRequest(id: any): Observable<any> {
  const url = `${this.BaseUrl}/${id}`;
  return this.http.get(url);
}

// patch
patchRequest(id: any, body: any): Observable<any> {
  const url = `${this.BaseUrl}/${id}`;
  return this.http.patch(url, body);
}

// delete
deleteRequest(id: any): Observable<any> {
  const url = `${this.BaseUrl}/${id}`;
  return this.http.delete(url);
}
}
