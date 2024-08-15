import { Injectable, Provider } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { HttpInterceptorFn, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class jwtInterceptor implements HttpInterceptorFn {
    constructor(
      private authenticationService: AuthenticationService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
      var isAuthAPI: boolean;
      console.log('Interceptor::URL' + request.url);
      if(request.url.startsWith('login') || request.url.startsWith('register')) {
        isAuthAPI = true;
      }
      else {
        isAuthAPI = false;
      }

      if(this.authenticationService.isLoggedIn() && !isAuthAPI) {
        let token = this.authenticationService.getToken();
        console.log(token);
        const authReg = request.clone({
          setHeaders: {
            Authorization: 'Bearer ${token}'
          }
        });
        return next.handle(authReg);
      }
      return next.handle(request);
        }
        
}
export const authInterceptProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
    useClass: jwtInterceptor, multi: true
};

