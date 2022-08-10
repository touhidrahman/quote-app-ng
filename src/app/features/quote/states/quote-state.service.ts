import { Injectable } from '@angular/core'
import { Quote, QuoteSearchResponse } from '@core/interfaces'
import { BasicPageState } from '@core/states/basic-page-state.service'
import { combineLatest, debounceTime, interval, switchMap, takeUntil, tap } from 'rxjs'
import { StateSubject } from '@core/utils/rxjs-state-subject'
import { QuoteService } from '../services/quote.service'

@Injectable()
export class QuoteStateService extends BasicPageState {
    randomQuote = new StateSubject<Quote | null>(null)

    constructor(private quoteService: QuoteService) {
        super()
        this.pollRandomQuote()
    }

    private pollRandomQuote() {
        // get a random quote every 10 seconds
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
}
