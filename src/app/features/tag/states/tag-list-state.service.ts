import { Injectable } from '@angular/core'
import { Tag } from '@core/interfaces'
import { BasicState } from '@core/states/basic-state.service'
import { StateSubject } from '@core/utils/rxjs-state-subject'
import { of, switchMap, takeUntil, tap } from 'rxjs'
import { TagService } from '../services/tag.service'

@Injectable()
export class TagListStateService extends BasicState {
    tags = new StateSubject<Tag[]>([])

    constructor(private tagService: TagService) {
        super()
        this.init()
    }

    reset(): void {
        this.tags.reset()
        super.reset()
    }

    private init(): void {
        of(1)
            .pipe(
                tap(() => this.loading.next(true)),
                switchMap(() => this.tagService.getTags('quoteCount')),
                takeUntil(this.destroyed),
            )
            .subscribe({
                next: (value) => {
                    this.loading.next(false)
                    this.tags.next(value)
                },
            })
    }
}
