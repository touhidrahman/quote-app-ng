import { Injectable } from '@angular/core'
import { QuoteAuthorResponse } from '@core/interfaces'
import { BasicPageState } from '@core/states/basic-page-state.service'
import { tap, takeUntil, switchMap } from 'rxjs'
import { StateSubject } from '@core/utils/rxjs-state-subject'
import { AuthorService } from '../services/author.service'

const RESULTS_PER_PAGE = 20

@Injectable()
export class AuthorListStateService extends BasicPageState {
    authorResponse = new StateSubject<QuoteAuthorResponse | null>(null)

    constructor(private authorService: AuthorService) {
        super()
        this.init()
    }

    reset(): void {
        this.authorResponse.reset()
        super.reset()
    }

    private init(): void {
        // on change page no, load new authors
        this.page.value$
            .pipe(
                tap(() => this.loading.next(true)),
                switchMap((page) => this.authorService.getAuthors(RESULTS_PER_PAGE, page)),
                takeUntil(this.destroyed),
            )
            .subscribe({
                next: (response) => {
                    this.loading.next(false)
                    this.authorResponse.next(response)
                },
            })
    }
}
