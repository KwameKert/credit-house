import { Component, Input, OnInit } from '@angular/core';
import { Customer } from '../../../core/models/customer/customer.model';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent implements OnInit {
  @Input() customer?: Customer;

  constructor() {}

  ngOnInit(): void {}
}
