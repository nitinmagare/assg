import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RecordService {

  private APP_FETCH_URL = environment.apiEndpoint;
  records = [{
    "start": "2019-10-22T18:06:33.003+0000",
    "end": "2019-10-22T19:06:33.003+0000",
    "email": "aliriza_1.saral@gmail.com"
  }, {
    "start": "2019-10-22T21:06:33.003+0000",
    "end": "2019-10-22T22:06:33.003+0000",
    "email": "aliriza_2.saral@gmail.com"
  }, {
    "start": "2019-10-23T00:06:33.003+0000",
    "end": "2019-10-23T01:06:33.003+0000",
    "email": "aliriza_3.saral@gmail.com"
  }, {
    "start": "2019-10-23T03:06:33.003+0000",
    "end": "2019-10-23T04:06:33.003+0000",
    "email": "aliriza_4.saral@gmail.com"
  }, {
    "start": "2019-10-23T06:06:33.003+0000",
    "end": "2019-10-23T07:06:33.003+0000",
    "email": "aliriza_5.saral@gmail.com"
  }, {
    "start": "2019-10-23T09:06:33.003+0000",
    "end": "2019-10-23T10:06:33.003+0000",
    "email": "aliriza_6.saral@gmail.com"
  }, {
    "start": "2019-10-23T12:06:33.003+0000",
    "end": "2019-10-23T13:06:33.003+0000",
    "email": "aliriza_7.saral@gmail.com"
  }, {
    "start": "2019-10-23T15:06:33.003+0000",
    "end": "2019-10-23T16:06:33.003+0000",
    "email": "aliriza_8.saral@gmail.com"
  }, {
    "start": "2019-10-23T18:06:33.003+0000",
    "end": "2019-10-23T19:06:33.003+0000",
    "email": "aliriza_9.saral@gmail.com"
  }, {
    "start": "2019-10-23T21:06:33.003+0000",
    "end": "2019-10-23T22:06:33.003+0000",
    "email": "aliriza_10.saral@gmail.com"
  }, {
    "start": "2019-10-23T18:06:33.003+0000",
    "end": "2019-10-23T19:06:33.003+0000",
    "email": "aliriza_11.saral@gmail.com"
  }, {
    "start": "2019-10-23T21:06:33.003+0000",
    "end": "2019-10-23T22:06:33.003+0000",
    "email": "aliriza_12.saral@gmail.com"
  }, {
    "start": "2019-10-23T12:06:33.003+0000",
    "end": "2019-10-23T13:06:33.003+0000",
    "email": "aliriza_13.saral@gmail.com"
  }, {
    "start": "2019-10-23T15:06:33.003+0000",
    "end": "2019-10-23T16:06:33.003+0000",
    "email": "aliriza_14.saral@gmail.com"
  }, {
    "start": "2019-10-23T18:06:33.003+0000",
    "end": "2019-10-23T19:06:33.003+0000",
    "email": "aliriza_15.saral@gmail.com"
  }, {
    "start": "2019-10-23T21:06:33.003+0000",
    "end": "2019-10-23T22:06:33.003+0000",
    "email": "aliriza_16.saral@gmail.com"
  }, {
    "start": "2019-10-23T18:06:33.003+0000",
    "end": "2019-10-23T19:06:33.003+0000",
    "email": "aliriza_17.saral@gmail.com"
  }, {
    "start": "2019-10-23T21:06:33.003+0000",
    "end": "2019-10-23T22:06:33.003+0000",
    "email": "aliriza_18.saral@gmail.com"
  }];
  constructor(private httpClient: HttpClient) { }

  public getRecords(offset: number, length: number) { 
    console.log(this.APP_FETCH_URL + "/records?offset=" + offset + "&length=" + length);
    return this.records.slice(offset,length);
    // return this.httpClient.get(this.APP_FETCH_URL + "/records?offset=" + offset + "&length=" + length); 

  }
  public addRecord(data) {
    this.records.push({
      email: data.email,
      start: data.start,
      end: data.end
    }); 
    // this.httpClient.post(this.APP_FETCH_URL,data);
  }
  public searchRecords(data,length:number) {
    console.log(this.APP_FETCH_URL + "/records?email=" + data.email + "&length=" + length);
    return this.records.filter(record => record.email == data.email);
    //  return this.httpClient.get(this.APP_FETCH_URL + "/records?email=" + data.email + "&length=" + length); 
  }
}
