// import { Injectable } from '@angular/core';
// import * as nodemailer from 'nodemailer';

// @Injectable({
//   providedIn: 'root'
// })
// export class EmailService {

//   constructor() { }

//   sendEmail(subject: string, body: string) {
//     // 创建邮件传输对象
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'C110118232@nkust.edu.tw', // 发件人的邮箱地址
//         pass: 'Q224198601' // 发件人的邮箱密码或授权码
//       }
//     });

//     // 设置电子邮件的选项
//     const mailOptions = {
//       from: 'C110118232@nkust.edu.tw', // 发件人地址
//       to: 'C110118232@nkust.edu.tw', // 收件人地址
//       subject: subject, // 邮件主题
//       text: body // 邮件正文
//     };

//     // 发送电子邮件
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error('邮件发送失败:', error);
//       } else {
//         console.log('邮件发送成功:', info.response);
//       }
//     });
//   }
// }
