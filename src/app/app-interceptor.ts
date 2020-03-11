import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { USER } from './constants';
@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
   intercept(req: HttpRequest<any>, next: HttpHandler):   Observable<HttpEvent<any>> {
       // All HTTP requests are going to go through this method
       let user = sessionStorage.getItem(USER);
       let newHeaders = req.headers;
       if (user) {
        newHeaders = newHeaders.append('user', JSON.parse(user).id);
       }
       const authReq = req.clone({headers: newHeaders});
       return next.handle(authReq);
  
   }
}