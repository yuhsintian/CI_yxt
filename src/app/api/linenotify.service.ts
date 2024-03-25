import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LineNotifyService {
  private readonly LINE_NOTIFY_API = 'https://notify-api.line.me/api/notify';
  private readonly ACCESS_TOKEN = '73H8n7zOdcGBGtKle2seLGj6BzU7NRz7s3qYoH5htPt'; // 用您自己的 Access Token 替换这里的值

  constructor(private http: HttpClient) { }

  sendLineNotification(message: string): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${this.ACCESS_TOKEN}`
    });

    const body = new URLSearchParams();
    body.set('message', message);

    this.http.post(this.LINE_NOTIFY_API, body.toString(), { headers }).subscribe(
      () => console.log('Line 通知发送成功'),
      error => console.error('Line 通知发送失败:', error)
    );
  }
}
