
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BaseUrl: string = 'http://163.18.42.233:4200/';
  // private BaseUrl: string = 'http://localhost:57307/';
  // private BaseUrl : string = 'https://www.nkust.edu.tw/'; // 替换为实际的系统网站URL
  constructor(private http: HttpClient) { }

  // 获取特定 URL 的 HTTP 状态码
  async checkSystemStatus(): Promise<number> {
    const url = `${this.BaseUrl}`;
    try {
      const response = await this.http.head(url, { observe: 'response' }).toPromise();
      if (response) {
        return response.status; // 返回 HTTP 状态码
      } else {
        throw new Error('Response is undefined');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error('There was a problem with the fetch operation: ' + error.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }

}
