import { Component, OnInit, Input } from '@angular/core';
import { Loan } from 'src/app/core/models/loan/loan.model';

@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.component.html',
  styleUrls: ['./loan-details.component.scss'],
})
export class LoanDetailsComponent implements OnInit {
  @Input() loan?: Loan;
  constructor() {}

  ngOnInit(): void {}
}
