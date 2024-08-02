import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CacheService } from "../service/cache.service";
import { Observable, of, tap } from "rxjs";





@Injectable()
export class CachingInterceptor implements HttpInterceptor {

  constructor(private cacheService: CacheService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // check if the request is cacheable
    if (request.method !== 'GET') {
      return next.handle(request);
    }

    const cachedResponse = this.cacheService.get(request.url);
    if (cachedResponse) {
      // retuern cached response if available
      return of(cachedResponse);
    }

    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event.type === HttpEventType.Response) {
          this.cacheService.put(request.url, event)
        }
      })
    )
  }
}
