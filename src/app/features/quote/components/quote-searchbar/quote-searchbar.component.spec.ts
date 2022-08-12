import { first } from 'rxjs'
import { QuoteSearchbarComponent } from './quote-searchbar.component'
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { By } from '@angular/platform-browser'

describe('Quote Searchbar Component', () => {
    let component: QuoteSearchbarComponent
    let fixture: ComponentFixture<QuoteSearchbarComponent>

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, FormsModule, QuoteSearchbarComponent],
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(QuoteSearchbarComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should contain a search input field', () => {
        const searchInput = fixture.nativeElement.querySelector('input')
        expect(searchInput).toBeTruthy()
    })

    it('should emit search term when search button clicked', () => {
        const searchTerm = 'search term'
        const spy = spyOn(component.searchTermChange, 'emit')

        component.search = searchTerm
        component.emitSearchTerm()

        expect(spy).toHaveBeenCalledWith(searchTerm)
    })

    it('input should have a value when enter key pressed', () => {
        const searchTerm = 'search term'
        const searchInput = fixture.debugElement.query(By.css('input'))

        searchInput.nativeElement.value = searchTerm

        searchInput.triggerEventHandler('keydown.enter', {})
        fixture.detectChanges()

        expect(fixture.nativeElement.querySelector('input').value).toEqual(searchTerm)
    })

    it('should raise search term change event when search term changed', () => {
        const searchTerm = 'search term'
        component.search = searchTerm

        component.searchTermChange.pipe(first()).subscribe({
            next: (value) => {
                expect(value).toBe(searchTerm)
            },
        })

        component.emitSearchTerm()
    })
})
