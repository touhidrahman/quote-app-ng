import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core'

@Component({
    selector: '[appButton]',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
    @HostBinding('disabled')
    @Input()
    disabled = false

    @HostBinding('class.rounded-full')
    @HostBinding('class.bg-green-100')
    @HostBinding('class.p-2')
    @HostBinding('class.text-sm')
    @HostBinding('class.text-green-500')
    klass = true
}
