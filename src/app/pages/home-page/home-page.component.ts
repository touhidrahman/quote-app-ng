import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { HeroQuoteComponent } from '@features/quote/components/hero-quote/hero-quote.component'
import { QuoteStateService } from '@features/quote/states/quote-state.service'

@Component({
    standalone: true,
    imports: [CommonModule, HeroQuoteComponent],
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    providers: [QuoteStateService],
})
export class HomePageComponent {
    constructor(public quoteState: QuoteStateService) {}
}
