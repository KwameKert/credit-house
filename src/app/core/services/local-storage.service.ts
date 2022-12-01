import { Injectable } from '@angular/core';
import { TOKEN } from '../models/common/common.constants';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storage: Storage = localStorage;
  private storeKey: string = TOKEN;

  constructor() {}

  public getStorage(): any {
    return this.storage.length !== 0
      ? JSON.parse(this.storage.getItem(this.storeKey) || '{}')
      : null;
  }

  public getStorageValue(name: string): any {
    const item = JSON.parse(localStorage.getItem(this.storeKey) || '{}');
    if (item === undefined || item === null) {
      return null;
    }
    return this.storage.length !== 0 ? item[name] : null;
  }

  public setStorage(data: object): void {
    this.storage.setItem(this.storeKey, JSON.stringify(data));
  }

  public setStorageValue(name: string, value: string): void {
    const session = JSON.parse(this.storage.getItem(this.storeKey) || '{}');
    session[name] = value;
    this.storage.setItem(this.storeKey, JSON.stringify(session));
  }

  public deleteStorage(): void {
    this.storage.clear();
  }

  public deleteStorageValue(key: string): void {
    const session = JSON.parse(this.storage.getItem(this.storeKey) ?? '');
    session[key] = undefined;
  }
}
