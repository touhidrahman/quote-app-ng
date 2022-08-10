import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { HeroQuoteComponent } from '@features/quote/components/hero-quote/hero-quote.component'

@Component({
    standalone: true,
    imports: [CommonModule, HeroQuoteComponent],
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {}
