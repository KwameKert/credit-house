import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Company } from '../../../core/models/company/company.model';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss'],
})
export class CompanyDetailsComponent implements OnInit {
  @Input() company?: Company;
  @Output() editCompanyEvent = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {}

  editCompany() {
    this.editCompanyEvent.emit(this.company);
  }
}
