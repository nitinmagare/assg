import { Component, OnInit } from '@angular/core';
import { RecordService } from './service/record.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TimeRecord } from './service/timerecord.model';
@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css'],
  providers: [DatePipe]
})
export class RecordComponent implements OnInit {
  disablePrevButton: boolean = true;
  disableNextButton: boolean = false;
  paginationSize = 10;
  currentPage = 0;
  items: TimeRecord[];
  recordForm;
  searchForm;
  constructor(private recordService: RecordService, private datePipe: DatePipe) {
    this.items = new Array();
  } 

  loadRecords(start: number, end: number) {
    this.recordService.getRecords(start, end).subscribe((res) => { this.items = this.handleNull(res); });
    
    // this.setItems(this.recordService.getRecords(start,end));
  }
  ngOnInit() {
    let today = new Date();
    this.loadRecords(0, this.paginationSize);
    this.searchForm = new FormGroup({
      email: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")
      ]))
    });

    this.recordForm = new FormGroup({
      email: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")
      ])),
      start: new FormControl(""),
      end: new FormControl("")
    });

    this.recordForm.patchValue({
      email: "tmp@gmail.com",
      start: this.datePipe.transform(new Date(), "yyyy-MM-ddThh:mm:ss"),
      end: this.datePipe.transform(new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0), "yyyy-MM-ddThh:mm:ss")
    });

  }

  converToDisplayString(str: string) {
    return this.datePipe.transform(new Date(Date.parse(str)), "yyyy-MM-ddThh:mm:ss.sssZ");
  }
  converToStoreString(str: string) { 
    return this.datePipe.transform(new Date(Date.parse(str)), "MM.dd.yyyy hh:mm");
  }

  addRecord(data) {
    data.start = this.converToStoreString(data.start);
    data.end = this.converToStoreString(data.end);
    this.recordService.addRecord(data.email,data.start,data.end);
    this.currentPage = 0;
    this.loadRecords(0, this.paginationSize); 
  }

  home() {
    this.currentPage = 0;
    this.loadRecords(0, this.paginationSize);
  }
  handleNull(res:TimeRecord[]){
    return res.filter(res=>{if(res==null)return false; else return true;});
  }
  searchRecord(input) {
    this.currentPage = 0;
    this.recordService.searchRecords(input, this.paginationSize).subscribe((res) => { 
      // console.log(res);     
        
      this.items = this.handleNull(res);
    });
  }
  nextPage() {
    this.currentPage++;
    let offset = this.currentPage * this.paginationSize;
    this.loadRecords(offset, this.paginationSize);
  }
  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      let offset = this.currentPage * this.paginationSize;
      this.loadRecords(offset,  this.paginationSize);
    } else {
      this.disablePrevButton = true;
    }
  }
}