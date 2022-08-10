import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { Author, Tag } from '@core/interfaces'
import { AuthorListComponent } from '@features/author/components/author-list/author-list.component'
import { AuthorListStateService } from '@features/author/states/author-list-state.service'
import { HeroQuoteComponent } from '@features/quote/components/hero-quote/hero-quote.component'
import { QuoteItemComponent } from '@features/quote/components/quote-item/quote-item.component'
import { QuoteStateService } from '@features/quote/states/quote-state.service'
import { TagListComponent } from '@features/tag/components/tag-list/tag-list.component'
import { TagListStateService } from '@features/tag/states/tag-list-state.service'

@Component({
    standalone: true,
    imports: [CommonModule, HeroQuoteComponent, QuoteItemComponent, AuthorListComponent, TagListComponent],
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    providers: [QuoteStateService, AuthorListStateService, TagListStateService],
})
export class HomePageComponent {
    constructor(
        public quoteState: QuoteStateService,
        public authorState: AuthorListStateService,
        public tagState: TagListStateService,
    ) {}

    selectAuthor(author: Author) {
        this.quoteState.author.next(author.slug)
    }

    selectTag(tag: Tag) {
        this.quoteState.tag.next(tag.name)
    }

    authorPageChange(page: number) {
        this.authorState.page.next(page)
    }
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
