
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LogService {
  constructor() { }
  //寫入日誌的方法
  log(message: string): void {
    //從 Local Storage 中取得目前的日誌記錄，如果不存在則設置為空陣列
    const logs = JSON.parse(localStorage.getItem('logs') || '[]');
    //將新的日誌訊息推送到 logs 陣列中，包括時間戳記和訊息本身
    logs.push({ timestamp: new Date().toISOString(), message });
    //將更新後的日誌重新存入 Local Storage
    localStorage.setItem('logs', JSON.stringify(logs));
  }
  //從日誌獲取紀錄的方法
  getLogs(): any[] {
    //從 Local Storage 中取得日誌記錄，如果不存在則返回空陣列
    return JSON.parse(localStorage.getItem('logs') || '[]');
  }
}
