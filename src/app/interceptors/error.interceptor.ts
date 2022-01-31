import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

import { ToastService } from 'ng-devui/toast';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private router: Router, private toastService: ToastService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
                if (error) {
                    if (error.status === 400) {
                        if (error.error.errors) {
                            console.log(error.error)
                            this.toastService.open({
                                value: [{ severity: 'info', summary: 'summary', content: 'details' }],
                            });
                        } else {
                            this.toastService.open({
                                value: [{ severity: 'info', summary: 'summary', content: 'Bad Request' }],
                            });
                        }
                    }
                    if (error.status === 401) {
                        this.toastService.open({
                            value: [{ severity: 'warn', summary: 'summary', content: 'You are unauthorized' }],
                        });
                    }
                    if (error.status === 403) {
                        this.toastService.open({
                            value: [{ severity: 'warn', summary: 'summary', content: 'You dont have permission to access this' }],
                        });
                    }
                    if (error.status === 404) {
                        this.toastService.open({
                            value: [{ severity: 'warn', summary: 'summary', content: 'Not Found' }],
                        });

                    }
                    if (error.status === 500) {
                        const navigationExtras: NavigationExtras = { state: { error: error.error } }
                        this.toastService.open({
                            value: [{ severity: 'warn', summary: 'summary', content: 'details' }],
                        });
                    }
                    else {
                        this.toastService.open({
                            value: [{ severity: 'warn', summary: 'summary', content: 'details' }],
                        });
                    }
                }

                return throwError(error);
            })
        )
    }
}