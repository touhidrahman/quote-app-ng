import { Injectable } from '@angular/core'
import { Quote, QuoteSearchResponse } from '@core/interfaces'
import { BasicPageState } from '@core/states/basic-page-state.service'
import { combineLatest, debounceTime, interval, switchMap, takeUntil, tap } from 'rxjs'
import { StateSubject } from '@core/utils/rxjs-state-subject'
import { QuoteService } from '../services/quote.service'

@Injectable()
export class QuoteStateService extends BasicPageState {
    tag = new StateSubject<string>('')
    author = new StateSubject<string>('')
    limit = new StateSubject<number>(20)
    sortBy = new StateSubject<'dateAdded' | 'dateModified' | 'author' | 'content'>('dateAdded')

    randomQuote = new StateSubject<Quote | null>(null)
    quoteSearchResponse = new StateSubject<QuoteSearchResponse | null>(null)

    constructor(private quoteService: QuoteService) {
        super()
        this.init()
        this.pollRandomQuote()
    }

    reset(): void {
        this.tag.reset()
        this.sortBy.reset()
        this.author.reset()
        this.limit.reset()
        super.reset()
    }

    private pollRandomQuote() {
        interval(10_000)
            .pipe(
                switchMap(() => this.quoteService.getRandomQuote()),
                takeUntil(this.destroyed),
            )
            .subscribe({
                next: (quote) => {
                    this.randomQuote.next(quote)
                },
            })
    }

    private init() {
        // when any of the tag, author, limit, sortBy, page changes, fetch quotes
        combineLatest({
            tag: this.tag.value$,
            author: this.author.value$,
            limit: this.limit.value$,
            sortBy: this.sortBy.value$,
            page: this.page.value$,
        })
            .pipe(
                debounceTime(300), // debounce to prevent multiple requests without reasonable change
                tap(() => this.loading.next(true)),
                switchMap(({ tag, author, limit, sortBy, page }) => {
                    return this.quoteService.listQuotes(author, [tag], [], sortBy, limit, page)
                }),
                takeUntil(this.destroyed),
            )
            .subscribe({
                next: (response) => {
                    this.loading.next(false)
                    this.quoteSearchResponse.next(response)
                },
            })
    }
}
