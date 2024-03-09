
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // private BaseUrl: string = 'http://163.18.42.233:4200/';
  private BaseUrl : string = 'https://www.nkust.edu.tw/'; // 替换为实际的系统网站URL
  constructor(private http: HttpClient) { }

  // 检查系统状态
  checkSystemStatus(): Observable<any> {
    const url = `${this.BaseUrl}`;
    return this.http.get(url);
  }
}
