import { Component, OnInit } from '@angular/core';
import { RecordService } from './service/record.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
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
  items = [];
  recordForm;
  searchForm;
  constructor(private recordService: RecordService, private datePipe: DatePipe) { }

  ngOnInit() {
    let today = new Date();
    this.items = this.recordService.getRecords(0, this.paginationSize);
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
      email: "nitinmagare@gmail.com",
      start: this.datePipe.transform(new Date(), "yyyy-MM-ddThh:mm:ss"),
      end: this.datePipe.transform(new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0), "yyyy-MM-ddThh:mm:ss")
    });

  }

  converToDisplayString(str: string) {
    return this.datePipe.transform(new Date(Date.parse(str)), "yyyy-MM-ddThh:mm:ss.sssZ");
  }

  addRecord(data) {
    data.start = this.converToDisplayString(data.start);
    data.end = this.converToDisplayString(data.end);
    this.recordService.addRecord(data);
    this.currentPage =0;
    this.items =this.recordService.getRecords(0,this.paginationSize);
  }

  home() {   
    this.currentPage =0;
    this.items =this.recordService.getRecords(0,this.paginationSize);
  }

  searchRecord(input) {
    this.currentPage =0;
    this.recordService.searchRecords(input,this.paginationSize);
  }
  nextPage() {     
    this.currentPage++;     
    let offset =this.currentPage*this.paginationSize;
    this.items=this.recordService.getRecords(offset,offset+this.paginationSize);
      
  }
  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      let offset =this.currentPage*this.paginationSize;
      this.items=this.recordService.getRecords(offset,offset+this.paginationSize);
    } else {
      this.disablePrevButton = true;
    }
  }
}