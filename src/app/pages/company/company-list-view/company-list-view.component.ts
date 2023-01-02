import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  TableColumn,
  Pagination,
} from 'src/app/shared/components/generic-table/generc-table.model';
import { Company } from '../../../core/models/company/company.model';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { RootState } from 'src/app/store/models/root.model';
import { fromCompanyActions } from 'src/app/store/actions';
import { fromCompanySelectors } from 'src/app/store/selectors';
import {
  ActionModel,
  Actiontype,
} from '../../user/user-action-modal/user-action-model';
import { CompanyActionModalComponent } from '../company-action-modal/company-action-modal.component';
import { CompanyCreate } from 'src/app/core/models/company/company.model';

@Component({
  selector: 'app-company-list-view',
  templateUrl: './company-list-view.component.html',
  styleUrls: ['./company-list-view.component.scss'],
})
export class CompanyListViewComponent implements OnInit, OnDestroy {
  columnsToDisplay: TableColumn[] = [
    { columnName: 'Name', columnData: 'name' },
    { columnName: 'Code', columnData: 'code' },
    { columnName: 'Institution Type', columnData: 'institutionType' },
    { columnName: 'Status', columnData: 'status' },
  ];
  displayColumns = ['name', 'code', 'institutionType', 'status'];
  columnsToDisplayWithExpand = [...this.displayColumns, 'expand'];
  expandedElement: Company | null | undefined;
  companies?: Company[];
  selectedCompany?: Company;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  subscriptions?: Subscription;
  constructor(private store: Store<RootState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadCompanies({ size: this.pageSize, page: this.currentPage });
    this.initializeSelectors();
  }

  initializeSelectors(): void {
    this.subscriptions = this.store
      .pipe(select(fromCompanySelectors.selectCompanies))
      .subscribe((companies: Company[]) => {
        if (companies.length) {
          this.companies = companies;
        }
      });

    this.subscriptions.add(
      this.store
        .pipe(select(fromCompanySelectors.selectCompaniesTotal))
        .subscribe((userCount: number) => {
          this.totalRows = userCount;
        })
    );
  }

  loadCompanies(pageData: Pagination): void {
    this.store.dispatch(
      fromCompanyActions.paginateCustomer({ data: pageData })
    );
    this.store.dispatch(fromCompanyActions.fetchCompanies({ data: pageData }));
  }

  triggerActionCompanDialog(data: ActionModel) {
    const dialogRef = this.dialog.open(CompanyActionModalComponent, {
      data,
      width: '560px',
    });
    dialogRef.afterClosed().subscribe((company: CompanyCreate) => {
      if (company) {
        data.type == Actiontype.CREATE
          ? this.store.dispatch(fromCompanyActions.addCompany(company))
          : this.store.dispatch(fromCompanyActions.updateCompany(company));
      }
    });
  }

  addCompany() {
    const createActionModel = this.getCreateAction();
    this.triggerActionCompanDialog(createActionModel);
  }

  editCompany(company: Company) {
    const editActionModel = this.getEditAction(company);
    this.triggerActionCompanDialog(editActionModel);
  }

  getCreateAction(): ActionModel {
    const data: ActionModel = {
      type: Actiontype.CREATE,
      title: 'Add Company',
      description: 'Fill form details to add a new company',
    };
    return data;
  }

  getEditAction(company: Company): ActionModel {
    const data: ActionModel = {
      type: Actiontype.UPDATE,
      title: 'Edit Company',
      data: company,
      description: 'Fill form details to edit a new company',
    };
    return data;
  }

  selectCompany(data: Company) {
    this.selectedCompany = data;
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }
}
