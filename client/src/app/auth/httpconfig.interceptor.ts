import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http"

@Injectable({
    providedIn: "root"
})
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor() {}
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = localStorage.getItem('Token');
        const authReq = req.clone({
            headers: req.headers.set('Authorization', authToken || '{}')
        });

        return next.handle(authReq);
    }
}