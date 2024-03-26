import { Component, OnInit, OnDestroy } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ApiService } from './api/api.service';
import { EmailService } from './api/email.service';
import { LineNotifyService } from './api/linenotify.service';
import { LogService } from './api/log.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CI_yxt';
  date: Date[] | undefined;
  Times = [
    { name: '時段1', code: 'time1' },
    { name: '時段2', code: 'time2' },
    { name: '時段3', code: 'time3' }
  ];
  selectedTimes: { hour: number, minute: number, second: number }[] = [
    { hour: 0, minute: 0, second: 0 },
    { hour: 0, minute: 0, second: 0 },
    { hour: 0, minute: 0, second: 0 }
  ];
  private checkTimes: { hour: number, minute: number, second: number }[] = [];

  // // 設定要檢查的時間，分別為15點00分00秒、15點00分30秒及15點01分00秒
  // private checkTimes: { hour: number, minute: number, second: number }[] = [
  //   { hour: 14, minute: 10, second: 0 },
  //   { hour: 14, minute: 10, second: 30 },
  //   { hour: 14, minute: 11, second: 0 }
  // ];

  private systemCheckSubscription: Subscription | undefined;
  // 使用者选择的时间
  // selectedTimes: { hour: number, minute: number }[] = [];
  timeOptions: any[] | undefined;

  constructor(private http: ApiService, private emailService: EmailService, private LineNotifyService: LineNotifyService, private logService: LogService) {
    this.checkTimes = JSON.parse(localStorage.getItem('selectedTimes') || '[]');
  }

  ngOnInit(): void {

    // 在页面加载时立即检查
    this.checkImmediately();
    // 在每天的特定时段进行定时检查
    this.startScheduledChecks();

  }

  ngOnDestroy() {
    if (this.systemCheckSubscription) {
      this.systemCheckSubscription.unsubscribe();
    }
  }

  checkImmediately() {
    this.checkSystemStatus();
  }

  //如果選擇的時間與當前時間符合，立即檢查狀態
  startScheduledChecks() {
    for (const checkTime of this.checkTimes) {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentSecond = now.getSeconds();

      const checkTimeInSeconds = checkTime.hour * 3600 + checkTime.minute * 60 + checkTime.second;
      const currentTimeInSeconds = currentHour * 3600 + currentMinute * 60 + currentSecond;

      if (currentTimeInSeconds <= checkTimeInSeconds) {
        const delayInSeconds = checkTimeInSeconds - currentTimeInSeconds;
        const delayInMilliseconds = delayInSeconds * 1000;
        setTimeout(() => {
          this.checkSystemStatus();
        }, delayInMilliseconds);

      }
    }
  }

  //檢查系統狀態
  checkSystemStatus() {
    this.http.checkSystemStatus().then(data => {
      console.log('系統正常運行：' + 'current time:' + new Date());
      console.log('System status:', data);
      // 根據 HTTP 狀態碼決定發送的消息
      const message = (data === 200) ? 'MeGlobe系統運行成功' : 'MeGlobe系統運行失敗';
      //LINE告警
      this.sendLineNotification(message);
      // 在此处处理返回的数据
    }).catch(error => {
      console.error('系統出現問題:', error);
      console.log('current time:' + new Date());
      //LINE告警
      this.sendLineNotification('MeGlobe系統運行失敗');
    });
  }

  //儲存新選擇的時間段
  onSaveTimes() {
    // 清空原有的检查时间数组
    this.checkTimes = [];
    // 添加用户选择的时间到检查时间数组中
    for (const selectedTime of this.selectedTimes) {
      this.checkTimes.push({
        hour: selectedTime.hour,
        minute: selectedTime.minute,
        second: selectedTime.second
      });
    }
    console.log('selected Time:', this.checkTimes)
    //將選取的時間儲存到localStorage中
    localStorage.setItem('selectedTimes', JSON.stringify(this.checkTimes));
    this.logService.log('User selected time');
    // 开始使用新的时间进行检查
    this.startScheduledChecks();
  }

  //郵件
  // sendEmail(subject: string, body: string) {
  //   this.emailService.sendEmail(subject, body);
  // }

  //LINE告警
  sendLineNotification(message: string) {
    // const message = 'MeGlobe系統運行成功';
    this.LineNotifyService.sendLineNotification(message)
      .then(status => {
        console.log('發送通知的狀態碼:', status);
        // 在這裡可以根據 HTTP 狀態碼執行相應的操作
        console.log('系統檢查結果已由Line Notify發送通知');
      })
      .catch(error => {
        console.error('系統檢查結果通知失敗:', error);
        // 處理發送通知失敗的情況
        if (error instanceof Error) {
          console.error('發送 Line Notify 通知時發生錯誤:', error.message);
        } else {
          console.error('未知的錯誤:', error);
        }
      });
  }

}
