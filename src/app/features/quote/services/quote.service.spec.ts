import { HttpClient } from '@angular/common/http'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { AppConfig, APP_CONFIG } from '@core/config/app-config'
import { Quote, QuoteSearchResponse } from '@core/interfaces'
import { QuoteService } from './quote.service'

describe('QuoteService', () => {
    let httpClient: HttpClient
    let httpTestingController: HttpTestingController
    let quoteService: QuoteService

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                QuoteService,
                {
                    provide: APP_CONFIG,
                    useValue: {
                        production: false,
                        apiUrl: 'mock-endpoint',
                    } as AppConfig,
                },
            ],
        })

        httpClient = TestBed.inject(HttpClient)
        httpTestingController = TestBed.inject(HttpTestingController)

        quoteService = TestBed.inject(QuoteService)
    })

    it('should be created', () => {
        expect(quoteService).toBeTruthy()
    })

    it('should get random quote', (done: DoneFn) => {
        const expectedQuote: Quote = {
            _id: '1',
            content: 'content',
            author: 'author',
            authorSlug: 'author-slug',
            length: 6,
            tags: ['tag1', 'tag2'],
        }

        httpClient.get<Quote>('/random').subscribe({
            next: (quote: Quote) => {
                expect(quote).withContext('expected quote').toEqual(expectedQuote)

                done()
            },
            error: done.fail,
        })

        let mockRequest = httpTestingController.expectOne('/random')

        mockRequest.flush(expectedQuote)
    })

    it('should list quotes', (done: DoneFn) => {
        const expectedResponse: QuoteSearchResponse = {
            count: 1,
            totalCount: 1,
            page: 1,
            totalPages: 1,
            lastItemIndex: 1,
            results: [],
        }

        httpClient.get<QuoteSearchResponse>('/quotes').subscribe({
            next: (response: QuoteSearchResponse) => {
                expect(response).withContext('expected response').toEqual(expectedResponse)

                done()
            },
            error: done.fail,
        })

        let mockRequest = httpTestingController.expectOne('/quotes')

        mockRequest.flush(expectedResponse)
    })

    afterEach(() => {
        httpTestingController.verify()
    })
})
