
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BaseUrl: string = 'http://163.18.42.233:4200/';

  // const apiUrl = '/api/your_endpoint_here';
  // private BaseUrl : string = 'https://www.nkust.edu.tw/'; // 替换为实际的系统网站URL
  constructor(private http: HttpClient) { }

  // // 检查系统状态
  // checkSystemStatus(): Observable<any> {
  //   const url = `${this.BaseUrl}`;
  //   return this.http.get(url);
  // }

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

  // checkSystemStatus() {
  //   return fetch('http://163.18.42.233:4200/', {
  //     method: 'GET',
  //     headers: {
  //       'Origin': 'http://localhost:4200',
  //       'Authorization': 'Bearer eyJhbGciOiJSU0EtT0FFUC0yNTYiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwidHlwZSI6IkpXRSIsInppcCI6IkRFRiJ9.ROzeD7xsbpuFZSGbQSXFD18HMKvZrYNdvxl1yDxJfNwEJetJfrX2lX5jJ2nJjPorAHkVlyGK7TkeWASg4L6or6RRYGk0b5GL-thxIypKk52_uw8rmB1tKffIMfkyLYKdnJjpCb0fxD_fX8HBYPTHNfS_wYYIaeaLjkWJ3KCMr2IRItqboIO_2Lw1PXzOxwfQBqVEqHPYsSCIrxx_1X5qfkQcdzzomK9zE4XVVYJYI1RDuBnjoCXgFQBY_I0Vof5DtbUYLK1vT9M0v7XjfoNcXshG-FXGgqt0PYWXO_g6p_wojm5W2_ogulIwS7IA_ZNbQ4kjgn6mhwE9Yi7bL6AUTKE3vBrcS5SacrtIgLuvdLdozylNWAibj3-wGY0cfn5sl_eIerzbxsu-tMntcAb23JaDYN6BCCOHwUlypisUektPYcx9dW9cksBlUEkS2uoMxdILkTZSFVzSBxiW-82Y7AspW7K_hwRJlRVmDq_d1W26_x6F-UO0S5cGaC7vQZjybIgbG7AsC91-pAgfndJa3u-6wHLDuLQdVEnqomUiHZBa9OJXOJ4EvYyHJeaCcwJT9Yj1bKK7iehsY6s4th8t5glqlv1kWrLVn1RZdawSgpSajnC1lvodkDbZK1O8CAW28NWhEQjeaPQ2xCOD5YfZV_mpFEN92gnbjeBMIGf9lSI.I451rbPcAe1buAzAL77b2g.fuvcAkCJcXYVyxHarpeRsoQDqGxc2C_-a5kXD0KuaXGW8joBQz9Stit0MqDIRaEIF7UVZZNdmZJJtbRLUeShYhziJaFoKkR3YIysMnCa9tNI3qH_8xw1vkIBuybe7NIo76LfWihTJNE4ROsMjBHjD79s5Hktb8pttLZIm-2QuoZQSWWwOH1CKtLzpBEstyaySBgN4rrSiNTGzzBhFgtcBw.XdqT8iQxRLudANll7om9G7dxG7vanV6sHOlBH2DSJf0'
  //     }
  //   })
  //   .then(response => {
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     return response.json();
  //   })
  //   .catch(error => {
  //     throw new Error('There was a problem with the fetch operation: ' + error.message);
  //   });
  // }

  // // 检查系统状态
  // checkSystemStatus(): Promise<any> {
  //   const url = `${this.BaseUrl}`;
  //   const headers = new Headers();
  //   // headers.append('Content-Type', 'application/json');
  //   // 添加其他标头
  //   headers.append('Authorization', 'Bearer ' + 'eyJhbGciOiJSU0EtT0FFUC0yNTYiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwidHlwZSI6IkpXRSIsInppcCI6IkRFRiJ9.ROzeD7xsbpuFZSGbQSXFD18HMKvZrYNdvxl1yDxJfNwEJetJfrX2lX5jJ2nJjPorAHkVlyGK7TkeWASg4L6or6RRYGk0b5GL-thxIypKk52_uw8rmB1tKffIMfkyLYKdnJjpCb0fxD_fX8HBYPTHNfS_wYYIaeaLjkWJ3KCMr2IRItqboIO_2Lw1PXzOxwfQBqVEqHPYsSCIrxx_1X5qfkQcdzzomK9zE4XVVYJYI1RDuBnjoCXgFQBY_I0Vof5DtbUYLK1vT9M0v7XjfoNcXshG-FXGgqt0PYWXO_g6p_wojm5W2_ogulIwS7IA_ZNbQ4kjgn6mhwE9Yi7bL6AUTKE3vBrcS5SacrtIgLuvdLdozylNWAibj3-wGY0cfn5sl_eIerzbxsu-tMntcAb23JaDYN6BCCOHwUlypisUektPYcx9dW9cksBlUEkS2uoMxdILkTZSFVzSBxiW-82Y7AspW7K_hwRJlRVmDq_d1W26_x6F-UO0S5cGaC7vQZjybIgbG7AsC91-pAgfndJa3u-6wHLDuLQdVEnqomUiHZBa9OJXOJ4EvYyHJeaCcwJT9Yj1bKK7iehsY6s4th8t5glqlv1kWrLVn1RZdawSgpSajnC1lvodkDbZK1O8CAW28NWhEQjeaPQ2xCOD5YfZV_mpFEN92gnbjeBMIGf9lSI.I451rbPcAe1buAzAL77b2g.fuvcAkCJcXYVyxHarpeRsoQDqGxc2C_-a5kXD0KuaXGW8joBQz9Stit0MqDIRaEIF7UVZZNdmZJJtbRLUeShYhziJaFoKkR3YIysMnCa9tNI3qH_8xw1vkIBuybe7NIo76LfWihTJNE4ROsMjBHjD79s5Hktb8pttLZIm-2QuoZQSWWwOH1CKtLzpBEstyaySBgN4rrSiNTGzzBhFgtcBw.XdqT8iQxRLudANll7om9G7dxG7vanV6sHOlBH2DSJf0');

  //   return fetch(url, {
  //     method: 'GET',
  //     headers: headers,
  //   }).then(response => {
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     return response.json();
  //   });
  // }


}
