import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IHttpState } from '../models/common/loader.mdels';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  state = new BehaviorSubject<IHttpState>({} as IHttpState);
  constructor() {}
}
