import { HttpParams } from '@angular/common/http'

/** Get a safe value for page and limit as query params */
export function appendSafeLimitAndPage(params: HttpParams, limit: number, page: number): HttpParams {
    const safeLimit = limit > 150 ? 150 : limit < 1 ? 20 : limit // allow 0 - 150, otherwise reset to 20
    params = params.append('limit', safeLimit)

    const safePage = page < 1 ? 1 : page // do not allow negative value
    params = params.append('page', safePage)

    return params
}
