import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private cache: Map<string, any> = new Map();

  constructor() { }

  put(url: string, response: any) {
    console.log("cache miss");

    this.cache.set(url, response)
  }

  get(url: string): any {
    console.log("cache hit");
    this.cache.get(url)
  }

  clear() {
    this.cache.clear();
  }
}
