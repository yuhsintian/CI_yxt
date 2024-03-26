import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LineNotifyService {
  // private readonly LINE_NOTIFY_API = 'https://notify-api.line.me/api/notify';
  private readonly LINE_NOTIFY_API = '/api/notify';
  private readonly ACCESS_TOKEN = '73H8n7zOdcGBGtKle2seLGj6BzU7NRz7s3qYoH5htPt'; // 用您自己的 Access Token 替换这里的值

  constructor(private http: HttpClient) { };

  //向LINE Notify發送通知訊息
  async sendLineNotification(message: string): Promise<number> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${this.ACCESS_TOKEN}`
    });

    const body = new URLSearchParams();
    body.set('message', message);

    try {
      const response = await this.http.post(this.LINE_NOTIFY_API, body.toString(), { headers, observe: 'response' }).toPromise();
      if (response) {
        return response.status; // 返回 HTTP 狀態碼
      } else {
        throw new Error('Response is undefined');
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('There was a problem with the HTTP POST operation: ' + error.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }

}
