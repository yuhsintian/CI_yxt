import { Component, OnInit, OnDestroy } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ApiService } from './api/api.service';
// import { EmailService } from './api/email.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CI_yxt';
  date: Date[] | undefined;
  // 設定要檢查的時間，分別為15點00分00秒、15點00分30秒及15點01分00秒
  private checkTimes: { hour: number, minute: number, second: number }[] = [
    { hour: 16, minute: 9, second: 0 },
    { hour: 16, minute: 9, second: 30 },
    { hour: 16, minute: 10, second: 0 }
  ];

  private systemCheckSubscription: Subscription | undefined;

  constructor(private http: ApiService) { }

  ngOnInit() {
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

  // 开始定时检查
  startScheduledChecks() {
    // 获取当前时间
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentSecond = now.getSeconds();

    // 定义要进行检查的时间点，每天早上8点0分0秒、下午1点0分0秒、晚上6点0分0秒
    const checkTimes = [
      { hour: 17, minute: 12, second: 0 },
      { hour: 17, minute: 12, second: 30 },
      { hour: 17, minute: 13, second: 0 }
    ];

    // 在特定的时间点进行检查
    for (const checkTime of checkTimes) {
      // 将设定的时间点转换为秒数
      const checkTimeInSeconds = checkTime.hour * 3600 + checkTime.minute * 60 + checkTime.second;
      // 将当前时间转换为秒数
      const currentTimeInSeconds = currentHour * 3600 + currentMinute * 60 + currentSecond;

      if (currentTimeInSeconds <= checkTimeInSeconds) {
        // 如果当前时间小于或等于设定的时间点，计算距离该时间点的毫秒数
        const delayInSeconds = checkTimeInSeconds - currentTimeInSeconds;
        const delayInMilliseconds = delayInSeconds * 1000;
        setTimeout(() => {
          this.checkSystemStatus();
        }, delayInMilliseconds);
      }
    }
  }

  checkSystemStatus() {
    this.http.checkSystemStatus().subscribe(
      () => console.log('系统正常运行'),
      error => {
        console.error('系统出现问题:', error);
      }
    );
  }

  // sendEmail(subject: string, body: string) {
  //   this.emailService.sendEmail(subject, body);
  // }
}
