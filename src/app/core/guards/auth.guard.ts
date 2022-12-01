import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { RootState } from 'src/app/store/models/root.model';
import { LocalStorageService } from '../services/local-storage.service';
import { fromAuthSelectors } from 'src/app/store/selectors';
import { TOKEN } from '../models/common/common.constants';
import { Route } from 'src/app/core/models/common';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<RootState>,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.pipe(
      select(fromAuthSelectors.selectIsAuthenticated),
      map((isStoreAuthenticated: boolean) => {
        const token = this.localStorageService.getStorageValue(TOKEN);
        if (!isStoreAuthenticated) {
          if (token) {
            //can call actions
            return true;
          }
          this.localStorageService.deleteStorage();
          this.router.navigate([Route.LOGIN]);
        }
        return isStoreAuthenticated;
      })
    );
    //if store authenticated true, else check if token exist.
    return true;
  }
}
