import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  contactDetails: FormGroup;
  orderDetails: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
