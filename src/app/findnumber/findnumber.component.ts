import { Component, OnInit } from '@angular/core';
import { HttpCommonService } from '../http-common.service';

@Component({
  selector: 'app-findnumber',
  templateUrl: './findnumber.component.html',
  styleUrls: ['./findnumber.component.css']
})
export class FindnumberComponent implements OnInit {
  linkedinUrl: any = '';
  number: any = '';
  loading = false;
  constructor(private httpCommonService: HttpCommonService) { }

  ngOnInit(): void {
  }
  searchNumber(){
    this.loading = false;
    this.httpCommonService.getLinkedInNumber({url:this.linkedinUrl}).subscribe((res: any) => {
      this.number = res?.data?.raw_format || 'Not found';
      this.loading = true;
    }, (err) => {
      this.number = 'Not found';
      this.loading = true;
    });

  }
  clear(){
    this.linkedinUrl = '';
    this.number = '';
  }
}
