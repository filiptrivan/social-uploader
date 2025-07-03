import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiGeneratedService } from './api.service.generated';
import { ConfigService } from '../config.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService extends ApiGeneratedService {

    constructor(
        protected override http: HttpClient,
        protected override config: ConfigService,
    ) {
        super(http, config);
    }

    createCheckoutSession = (): Observable<any> => { 
        return this.http.post(`${this.config.apiUrl}/create-checkout-session`, {}, {responseType: 'text'});
    }
}
