import { Injectable } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { RouterStateSnapshot, TitleStrategy } from '@angular/router'

const AppName = 'my-ng-starter'

@Injectable()
export class CustomTitleStrategy extends TitleStrategy {
    constructor(private readonly title: Title) {
        super()
    }

    override updateTitle(routerState: RouterStateSnapshot): void {
        const pageTitle = this.buildTitle(routerState)
        this.title.setTitle(pageTitle ? `${AppName} - ${pageTitle}` : AppName)
    }
}
