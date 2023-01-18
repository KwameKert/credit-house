import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { RootState } from 'src/app/store/models/root.model';
import { Issue } from '../../../core/models/setting/issue.model';
import { fromSettingSelectors } from 'src/app/store/selectors';
import { Subscription, interval } from 'rxjs';
import { Pagination } from 'src/app/shared/components/generic-table/generc-table.model';
import { fromSettingsActions } from 'src/app/store/actions';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss'],
})
export class IssuesComponent implements OnInit, OnDestroy {
  subscriptions!: Subscription;
  isLoanLoading: boolean = false;
  columnsToDisplay = [
    { columnName: 'Id', columnData: 'id' },
    { columnName: 'Upload Type', columnData: 'uploadType' },
    { columnName: 'Created On', columnData: 'createdOn' },
  ];

  displayColumns = ['id', 'uploadType', 'createdOn'];
  columnsToDisplayWithExpand = [...this.displayColumns, 'expand'];
  expandedElement: Issue | null | undefined;
  issues?: Issue[];
  selectedIssue?: Issue;
  totalRows = 0;
  pageSize = 10;
  currentPage = 0;
  timeToRefresh = 15;
  sourceInterval = interval(this.timeToRefresh * 1000);
  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {
    this.loadIssues({ size: this.pageSize, page: this.currentPage });
    this.initializeSelectors();
    this.triggerTimer();
  }

  loadIssues(pageData: Pagination): void {
    this.store.dispatch(fromSettingsActions.fetchIssues({ data: pageData }));
  }
  initializeSelectors() {
    this.subscriptions = this.store
      .pipe(select(fromSettingSelectors.selectIssues))
      .subscribe((issues: Issue[]) => {
        if (issues.length) {
          this.issues = issues;
        }
      });

    this.subscriptions.add(
      this.store
        .pipe(select(fromSettingSelectors.selectIssuesTotal))
        .subscribe((count: number) => {
          this.totalRows = count;
        })
    );
  }

  triggerTimer() {
    this.subscriptions.add(
      this.sourceInterval.subscribe(() =>
        this.loadIssues({ size: this.pageSize, page: this.currentPage })
      )
    );
  }

  onSelectIssue(data: any) {
    this.selectedIssue = data;
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }
}
