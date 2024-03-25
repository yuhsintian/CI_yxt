import { Component, OnInit, OnDestroy } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ApiService } from './api/api.service';
import { EmailService } from './api/email.service';
import { LineNotifyService } from './api/linenotify.service';



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

  constructor(private http: ApiService, private emailService: EmailService, private LineNotifyService: LineNotifyService) { }

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

  // checkSystemStatus() {
  //   this.http.checkSystemStatus().subscribe(
  //     () => console.log('系統正常運行：' + 'current time:' + new Date()),

  //     error => {
  //       console.error('系統出現問題:', error);
  //       console.log('current time:' + new Date());
  //       // 发送邮件通知
  //       this.emailService.sendEmail().subscribe(
  //         () => console.log('郵件發送成功'),
  //         err => console.error('郵件發送失敗', err)
  //       );
  //     }
  //   );
  // }


  //檢查狀態
  checkSystemStatus() {
    this.http.checkSystemStatus().then(data => {
      console.log('System status:', data);
      console.log('系統正常運行：' + 'current time:' + new Date());
      // 在此处处理返回的数据
    }).catch(error => {
      console.error('系統出現問題:', error);
      console.log('current time:' + new Date());
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
    // 开始使用新的时间进行检查
    this.startScheduledChecks();
  }

  //郵件
  // sendEmail(subject: string, body: string) {
  //   this.emailService.sendEmail(subject, body);
  // }

  //LINE告警
  sendLineNotification() {
    const message = 'LINE告警！';
    this.LineNotifyService.sendLineNotification(message);
  }
}
