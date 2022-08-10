import { HttpClient, HttpParams } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { AppConfig, APP_CONFIG } from '@core/config/app-config'
import { Tag } from '@core/interfaces'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class TagService {
    private apiUrl: string

    constructor(@Inject(APP_CONFIG) environment: AppConfig, private http: HttpClient) {
        this.apiUrl = environment.apiUrl
    }

    /** get all tags */
    getTags(sortBy: 'dateAdded' | 'dateModified' | 'name' | 'quoteCount' = 'quoteCount'): Observable<Tag[]> {
        const params = new HttpParams().append('sortBy', sortBy)
        return this.http.get<Tag[]>(`${this.apiUrl}/tags`, { params })
    }
}
