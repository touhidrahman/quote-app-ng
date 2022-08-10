import { HttpClient, HttpParams } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { AppConfig, APP_CONFIG } from '@core/config/app-config'
import { QuoteAuthorResponse } from '@core/interfaces'
import { appendSafeLimitAndPage } from '@core/utils/safe-params'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class AuthorService {
    private apiUrl: string

    constructor(@Inject(APP_CONFIG) environment: AppConfig, private http: HttpClient) {
        this.apiUrl = environment.apiUrl
    }

    /** get author names with default filter values */
    getAuthors(limit = 20, page = 1): Observable<QuoteAuthorResponse> {
        let params = new HttpParams()
        params = appendSafeLimitAndPage(params, limit, page)

        return this.http.get<QuoteAuthorResponse>(`${this.apiUrl}/authors`, { params })
    }
}
