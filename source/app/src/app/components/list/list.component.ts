import { Component, OnInit } from '@angular/core';
import { QuoteService } from '../../services';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  list: any[];

  constructor(private service: QuoteService) { }

  ngOnInit() {
    this.service.list().subscribe(items => this.list = items);
  }
}
