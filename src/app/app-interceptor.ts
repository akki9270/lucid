import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { USER, TOKEN, AUTH_BEARER, AUTH_BEARER_VALUE } from './constants';
@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // All HTTP requests are going to go through this method
        let user = sessionStorage.getItem(USER);
        let token = sessionStorage.getItem(TOKEN);
        let newHeaders = req.headers;
        newHeaders = newHeaders.append(AUTH_BEARER, AUTH_BEARER_VALUE + token);
        if (user) {
            newHeaders = newHeaders.append('user', JSON.parse(user).id);
        }
        const authReq = req.clone({ headers: newHeaders });
        return next.handle(authReq);

    }
}