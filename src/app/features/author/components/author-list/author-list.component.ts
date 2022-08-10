import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { Author } from '@core/interfaces'

@Component({
    selector: 'app-author-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './author-list.component.html',
    styleUrls: ['./author-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorListComponent {
    @Input() authors: Author[] = []
    @Input() currentPage = 1
    @Input() totalPages = 1

    @Output() pageChange = new EventEmitter<number>()
    @Output() authorSelect = new EventEmitter<Author>()

    nextPage() {
        this.pageChange.emit(this.currentPage + 1)
    }

    previousPage() {
        this.pageChange.emit(this.currentPage - 1)
    }
}
