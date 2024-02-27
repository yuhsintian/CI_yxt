import { Component, OnInit, OnDestroy } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ApiService } from './api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CI_yxt';
  date: Date[] | undefined;
  days: number = 0;
  hours: number = 0;
  minutes: number = 5; // 默认为5分钟

  private systemUrl = 'http://163.18.42.233:4200/'; // 替换为实际的系统网站URL
  // private systemUrl = 'https://www.nkust.edu.tw/'; // 替换为实际的系统网站URL
  // private systemCheckSubscription: Subscription | undefined;

  constructor(private http: HttpClient, private apiService: ApiService) { }

  // ngOnInit() {
  //   this.startSystemCheckPolling();
  // }
  // ngOnDestroy() {
  //   if (this.systemCheckSubscription) {
  //     this.systemCheckSubscription.unsubscribe();
  //   }
  // }

  checkSystemStatus() {
    return this.http.get(this.systemUrl);
  }

  startSystemCheckPolling() {
    // // 每5分钟执行一次检查，可以根据需要调整间隔时间
    // interval(1 * 60 * 1000)
    //   .pipe(
    //     switchMap(() => this.checkSystemStatus())
    //   )
    //   .subscribe(
    //     () => console.log('系统正在运行'), // 在控制台输出系统正在运行的信息
    //     error => {
    //       console.error('系统出现问题:', error); // 在控制台输出系统出现问题的信息
    //       // 在这里可以添加发送报告的逻辑，例如使用邮件服务发送报告
    //     }
    //   );

    const intervalTime = (this.days * 24 * 60 * 60 + this.hours * 60 * 60 + this.minutes * 60) * 1000; // 将输入的天、小时、分钟转换为毫秒
    // if (this.systemCheckSubscription) {
    //   this.systemCheckSubscription.unsubscribe(); // 取消先前的订阅
    // }

    // this.systemCheckSubscription = interval(intervalTime)
    //   .pipe(
    //     switchMap(() => this.checkSystemStatus())
    //   )
    //   .subscribe(
    //     () => console.log('系统正在运行'), // 在控制台输出系统正在运行的信息
    //     error => {
    //       console.error('系统出现问题:', error); // 在控制台输出系统出现问题的信息
    //       // 在这里可以添加发送报告的逻辑，例如使用邮件服务发送报告
    //     }
    //   );

    interval(intervalTime)
      .pipe(
        switchMap(() => this.checkSystemStatus())
      )
      .subscribe(
        (response: any) => {
          // 响应成功，根据状态码进行相应的处理
          if (response.status === 200) {
            console.log('系统正在运行');
          } else if (response.status === 404) {
            console.error('网页找不到');
          } else if (response.status === 405) {
            console.error('前端错误');
          } else if (response.status === 500) {
            console.error('后端错误');
          } else {
            console.error('未知错误');
          }
        },
        error => {
          console.error('系统出现问题:', error); // 在控制台输出系统出现问题的信息
          // 在这里可以添加发送报告的逻辑，例如使用邮件服务发送报告
        }
      );
  }

}
