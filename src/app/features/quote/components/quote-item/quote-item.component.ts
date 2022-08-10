import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { Quote } from '@core/interfaces'

@Component({
    selector: 'app-quote-item',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './quote-item.component.html',
    styleUrls: ['./quote-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteItemComponent {
    @Input() quote: Quote | null = null
}
