import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {}

  get(item: string): string {
    return localStorage.getItem(item);
  }
  getObject(item: string): any {
    return JSON.parse(localStorage.getItem(item));
  }

  set(item: string, value: string): void {
    localStorage.setItem(item, value);
  }
  setObject(item: string, value: any): void {
    localStorage.setItem(item, JSON.stringify(value));
  }

  remove(item: string): void {
    localStorage.removeItem(item);
  }
}

