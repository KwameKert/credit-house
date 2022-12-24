import { Component, Inject, OnInit } from '@angular/core';
import {
  ActionModel,
  Actiontype,
} from '../../user/user-action-modal/user-action-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { CompanyCreate } from 'src/app/core/models/company/company.model';
import { Company } from '../../../core/models/company/company.model';

@Component({
  selector: 'app-company-action-modal',
  templateUrl: './company-action-modal.component.html',
  styleUrls: ['./company-action-modal.component.scss'],
})
export class CompanyActionModalComponent implements OnInit {
  title: string = '';
  actionType!: Actiontype;
  description!: string;
  companyForm!: FormGroup;
  status = [
    { id: 'ACTIVE', name: 'Active' },
    { id: 'INACTIVE', name: 'Inactive' },
  ];
  roles = [{ id: 'ADMIN', name: 'Admin' }];
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CompanyActionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public modelData: ActionModel,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initData(this.modelData);
    this.setupUserForm();

    if (this.modelData.type == Actiontype.UPDATE) {
      this.patchForm(this.modelData.data);
    }
  }

  initData(data: ActionModel) {
    this.actionType = data.type;
    this.title = data.title;
    this.description = data.description;
  }

  private setupUserForm(): void {
    this.companyForm = this.fb.group({
      id: [],
      name: [null, Validators.required],
      institutionType: [null, Validators.required],
      code: [null, Validators.required],
    });
  }

  submitForm(company: CompanyCreate) {
    this.dialogRef.close(company);
  }
  patchForm(company: Company) {
    this.companyForm.setValue({
      id: company.id,
      name: company.name,
      institutionType: company.institutionType,
      code: company.code,
    });
  }
}
