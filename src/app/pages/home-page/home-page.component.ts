import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { HeroQuoteComponent } from '@features/quote/components/hero-quote/hero-quote.component'
import { QuoteItemComponent } from '@features/quote/components/quote-item/quote-item.component'
import { QuoteStateService } from '@features/quote/states/quote-state.service'

@Component({
    standalone: true,
    imports: [CommonModule, HeroQuoteComponent, QuoteItemComponent],
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    providers: [QuoteStateService],
})
export class HomePageComponent {
    constructor(public quoteState: QuoteStateService) {}

    previousPage(currentPage: number) {
        const newPage = currentPage - 1
        if (newPage > 1) {
            this.quoteState.page.next(newPage)
        }
    }

    nextPage(currentPage: number, totalPages: number) {
        const newPage = currentPage + 1
        if (newPage <= totalPages) {
            this.quoteState.page.next(newPage)
        }
    }
}
