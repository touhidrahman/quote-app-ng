export interface Quote {
    _id: string
    content: string
    author: string
    authorSlug: string
    length: number
    tags: string[]
}

export interface QuoteSearchResponse {
    count: number
    totalCount: number
    page: number
    totalPages: number
    lastItemIndex: number
    results: Quote[]
}

export interface Tag {
    _id: string
    name: string
    slug: string
    quoteCount: number
}

export interface QuoteAuthorResponse {
    count: number
    totalCount: number
    page: number
    totalPages: number
    lastItemIndex: number | null
    results: Author[]
}

export interface Author {
    _id: string
    bio: string
    description: string
    link: string
    name: string
    slug: string
    quoteCount: string
}
