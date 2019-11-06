import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TimeRecord } from './timerecord.model';

interface TimeRecordObj {
  email: string;
  start: string;
  end: string;
}
interface RecordResponse {
  items: Array<TimeRecordObj>;
}

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  records: Array<TimeRecord>;
  // records = [{
  //   "start": "2019-10-22T18:06:33.003+0000",
  //   "end": "2019-10-22T19:06:33.003+0000",
  //   "email": "aliriza_1.saral@gmail.com"
  // }, {
  //   "start": "2019-10-22T21:06:33.003+0000",
  //   "end": "2019-10-22T22:06:33.003+0000",
  //   "email": "aliriza_2.saral@gmail.com"
  // }, {
  //   "start": "2019-10-23T00:06:33.003+0000",
  //   "end": "2019-10-23T01:06:33.003+0000",
  //   "email": "aliriza_3.saral@gmail.com"
  // }, {
  //   "start": "2019-10-23T03:06:33.003+0000",
  //   "end": "2019-10-23T04:06:33.003+0000",
  //   "email": "aliriza_4.saral@gmail.com"
  // }, {
  //   "start": "2019-10-23T06:06:33.003+0000",
  //   "end": "2019-10-23T07:06:33.003+0000",
  //   "email": "aliriza_5.saral@gmail.com"
  // }, {
  //   "start": "2019-10-23T09:06:33.003+0000",
  //   "end": "2019-10-23T10:06:33.003+0000",
  //   "email": "aliriza_6.saral@gmail.com"
  // }, {
  //   "start": "2019-10-23T12:06:33.003+0000",
  //   "end": "2019-10-23T13:06:33.003+0000",
  //   "email": "aliriza_7.saral@gmail.com"
  // }, {
  //   "start": "2019-10-23T15:06:33.003+0000",
  //   "end": "2019-10-23T16:06:33.003+0000",
  //   "email": "aliriza_8.saral@gmail.com"
  // }, {
  //   "start": "2019-10-23T18:06:33.003+0000",
  //   "end": "2019-10-23T19:06:33.003+0000",
  //   "email": "aliriza_9.saral@gmail.com"
  // }, {
  //   "start": "2019-10-23T21:06:33.003+0000",
  //   "end": "2019-10-23T22:06:33.003+0000",
  //   "email": "aliriza_10.saral@gmail.com"
  // }, {
  //   "start": "2019-10-23T18:06:33.003+0000",
  //   "end": "2019-10-23T19:06:33.003+0000",
  //   "email": "aliriza_11.saral@gmail.com"
  // }, {
  //   "start": "2019-10-23T21:06:33.003+0000",
  //   "end": "2019-10-23T22:06:33.003+0000",
  //   "email": "aliriza_12.saral@gmail.com"
  // }, {
  //   "start": "2019-10-23T12:06:33.003+0000",
  //   "end": "2019-10-23T13:06:33.003+0000",
  //   "email": "aliriza_13.saral@gmail.com"
  // }, {
  //   "start": "2019-10-23T15:06:33.003+0000",
  //   "end": "2019-10-23T16:06:33.003+0000",
  //   "email": "aliriza_14.saral@gmail.com"
  // }, {
  //   "start": "2019-10-23T18:06:33.003+0000",
  //   "end": "2019-10-23T19:06:33.003+0000",
  //   "email": "aliriza_15.saral@gmail.com"
  // }, {
  //   "start": "2019-10-23T21:06:33.003+0000",
  //   "end": "2019-10-23T22:06:33.003+0000",
  //   "email": "aliriza_16.saral@gmail.com"
  // }, {
  //   "start": "2019-10-23T18:06:33.003+0000",
  //   "end": "2019-10-23T19:06:33.003+0000",
  //   "email": "aliriza_17.saral@gmail.com"
  // }, {
  //   "start": "2019-10-23T21:06:33.003+0000",
  //   "end": "2019-10-23T22:06:33.003+0000",
  //   "email": "aliriza_18.saral@gmail.com"
  // }];
  constructor(private httpClient: HttpClient) {
  }
  private getBaseUrl() {
    // return environment.proxyEndPoint;
    return environment.proxyEndPoint + "/" + environment.apiEndpoint;
  }
  public getRecords(offset: number, length: number) {
    // const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
    let url = this.getBaseUrl() + "/records?offset=" + offset + "&length=" + length;
    console.log(url);
    return this.httpClient.get<TimeRecord[]>(url);//.subscribe(data=>{this.setRecords(data);});
    // console.log(this.records);
    //  return this.records.slice(offset, length);     
  }

  private setRecords(data) {
    this.records = data;
    // console.log(this.records);
  }

  public addRecord(email,start,end) {  
    let postUrl = this.getBaseUrl() + "/records"; 
    let formData = new FormData();
    formData.append('email',email);
    formData.append('start',start);
    formData.append('end',end);
    this.httpClient.post(postUrl, formData).subscribe((res) => {
      console.log("Created a Record");
    });
  } 

  public searchRecords(data, length: number) {
    let url = this.getBaseUrl() + "/records?email=" + data.email + "&length=" + length;
    return this.httpClient.get<TimeRecord[]>(url);

  }


} 
