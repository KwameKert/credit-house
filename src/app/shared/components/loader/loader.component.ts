import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoaderService } from '../../../core/services/loader.service';
import { Subscription, Observable } from 'rxjs';
import {
  HttpProgressState,
  IHttpState,
} from 'src/app/core/models/common/loader.mdels';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  public isLoading = false;
  private subscriptions: Subscription[] = [];
  private getLoader$!: Observable<IHttpState>;

  constructor(
    private loaderService: LoaderService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getLoader$ = this.loaderService.state;
    this.subscriptions.push(
      this.getLoader$.subscribe((progress: IHttpState) => {
        if (progress && progress.url) {
          this.isLoading = progress.state === HttpProgressState.start;
          this.changeDetectorRef.detectChanges();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions?.forEach((subscription) => subscription.unsubscribe());
  }
}
