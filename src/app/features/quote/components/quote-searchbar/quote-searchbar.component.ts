import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core'
import { FormsModule } from '@angular/forms'

@Component({
    selector: 'app-quote-searchbar',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './quote-searchbar.component.html',
    styleUrls: ['./quote-searchbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteSearchbarComponent {
    @Output() searchTermChange = new EventEmitter<string>()

    search = ''

    emitSearchTerm(): void {
        this.searchTermChange.emit(this.search)
    }
}
