import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
    selector: 'app-hero-quote',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './hero-quote.component.html',
    styleUrls: ['./hero-quote.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroQuoteComponent {
    @Input() content = ''
    @Input() author = ''
}
