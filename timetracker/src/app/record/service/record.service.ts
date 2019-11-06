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
  
  constructor(private httpClient: HttpClient) {
  }
  private getBaseUrl() {
    // return environment.proxyEndPoint;
    // return environment.proxyEndPoint + "/" + environment.apiEndpoint;
    return environment.proxyEndPoint + "/" + location.hostname + environment.apiEndpoint;
  }
  public getRecords(offset: number, length: number) {
    // const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
    let url = this.getBaseUrl() + "/records?offset=" + offset + "&length=" + length;
    // console.log(url);
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
