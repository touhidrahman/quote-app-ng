import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { Tag } from '@core/interfaces'

@Component({
    selector: 'app-tag-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './tag-list.component.html',
    styleUrls: ['./tag-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagListComponent {
    @Input() tags: Tag[] = []

    @Output() tagSelect = new EventEmitter<Tag>()
}
