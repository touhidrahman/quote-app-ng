import { HttpClient, HttpParams } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { AppConfig, APP_CONFIG } from '@core/config/app-config'
import { Quote, QuoteSearchResponse } from '@core/interfaces'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class QuoteService {
    private apiUrl: string

    constructor(@Inject(APP_CONFIG) environment: AppConfig, private http: HttpClient) {
        this.apiUrl = environment.apiUrl
    }

    getRandomQuote(tags: string[] = []): Observable<Quote> {
        const orQuery = tags.join('|') // ?tags=A|B format means match tags A or B
        const params = new HttpParams().append('tags', orQuery)
        return this.http.get<Quote>(`${this.apiUrl}/random`, { params })
    }

    listQuotes(
        authorNameOrSlug = '',
        tagsOr: string[] = [],
        tagsAnd: string[] = [],
        sortBy: 'dateAdded' | 'dateModified' | 'author' | 'content' = 'dateAdded',
        limit = 20,
        page = 1,
    ): Observable<QuoteSearchResponse> {
        let params = new HttpParams()

        if (authorNameOrSlug) {
            params = params.append('author', authorNameOrSlug)
        }

        const orQuery = tagsOr.join('|') // ?tags=A|B format means match tags A or B
        const andQuery = tagsAnd.join(',') // ?tags=A,B format means match tags A and B
        params = params.append('tags', andQuery)
        // prefer orQuery if both are provided
        if (orQuery.length) {
            params = params.set('tags', orQuery)
        }

        params = params.append('sortBy', sortBy)
        params = this.appendSafeLimitAndPage(params, limit, page)

        return this.http.get<QuoteSearchResponse>(`${this.apiUrl}/quotes`, { params })
    }

    search(term: string, limit = 20, page = 1): Observable<QuoteSearchResponse> {
        let params = new HttpParams()
        params = params.set('query', term)
        params = this.appendSafeLimitAndPage(params, limit, page)

        return this.http.get<QuoteSearchResponse>(`${this.apiUrl}/search/quotes`, { params })
    }

    private appendSafeLimitAndPage(params: HttpParams, limit: number, page: number): HttpParams {
        const safeLimit = limit > 150 ? 150 : limit < 1 ? 20 : limit // allow 0 - 150, otherwise reset to 20
        params = params.append('limit', safeLimit)

        const safePage = page < 1 ? 1 : page // do not allow negative value
        params = params.append('page', safePage)

        return params
    }
}
