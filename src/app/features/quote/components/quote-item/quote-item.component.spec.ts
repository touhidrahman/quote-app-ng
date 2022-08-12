import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { Quote } from '@core/interfaces'
import { QuoteItemComponent } from './quote-item.component'

describe('Quote Item Component', () => {
    let component: QuoteItemComponent
    let fixture: ComponentFixture<QuoteItemComponent>
    let quote: Quote

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [QuoteItemComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(QuoteItemComponent)
        component = fixture.componentInstance

        quote = {
            _id: '1',
            content: 'content',
            author: 'author',
            tags: ['tag'],
            authorSlug: 'author-slug',
            length: 1,
        }
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('paragraph should contain a quote', () => {
        component.quote = quote
        fixture.detectChanges()

        const paragraph = fixture.debugElement.query(By.css('p')).nativeElement

        expect(paragraph.textContent).toContain(quote.content)
    })

    it('template should not contain any html when input is null', () => {
        component.quote = null
        fixture.detectChanges()

        const paragraph = fixture.debugElement.query(By.css('p'))

        expect(paragraph?.nativeElement).toBe(undefined)
    })
})
