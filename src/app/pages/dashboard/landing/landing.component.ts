import { Component, OnInit, OnDestroy } from '@angular/core';
import { Widget } from 'src/app/core/models/dashboard/dashboard.model';
import { Store, select } from '@ngrx/store';
import { RootState } from 'src/app/store/models/root.model';
import { fromDashboardActions } from 'src/app/store/actions';
import { Subscription } from 'rxjs';
import { fromDashboardSelectors } from 'src/app/store/selectors';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit, OnDestroy {
  active!: number;
  inactive!: number;
  education!: Widget[];
  gender!: Widget[];
  sector!: Widget[];
  subscription?: Subscription;
  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {
    this.loadData();
    this.initializeSelectors();
  }

  initializeSelectors() {
    this.selectActiveStat();
    this.selectInActiveStat();
    this.selectGenderStat();
    this.selectSectorStat();
    this.selectEducationStat();
  }

  loadData() {
    this.store.dispatch(fromDashboardActions.getActiveStat());
    this.store.dispatch(fromDashboardActions.getInactiveStat());
    this.store.dispatch(fromDashboardActions.getGenderStat());
    this.store.dispatch(fromDashboardActions.getEducationStat());
    this.store.dispatch(fromDashboardActions.getSectorStat());
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  selectActiveStat() {
    this.subscription = this.store
      .pipe(select(fromDashboardSelectors.selectActive))
      .subscribe((active: number) => {
        this.active = active;
      });
  }

  selectInActiveStat() {
    this.subscription?.add(
      this.store
        .pipe(select(fromDashboardSelectors.selectInactive))
        .subscribe((inActive: number) => {
          this.inactive = inActive;
        })
    );
  }

  selectGenderStat() {
    this.subscription?.add(
      this.store
        .pipe(select(fromDashboardSelectors.selectGender))
        .subscribe((data: Widget[]) => {
          this.gender = data;
        })
    );
  }

  selectEducationStat() {
    this.subscription?.add(
      this.store
        .pipe(select(fromDashboardSelectors.selectEducation))
        .subscribe((data: Widget[]) => {
          this.education = data;
        })
    );
  }

  selectSectorStat() {
    this.subscription?.add(
      this.store
        .pipe(select(fromDashboardSelectors.selectSector))
        .subscribe((data: Widget[]) => {
          this.sector = data;
        })
    );
  }
}
