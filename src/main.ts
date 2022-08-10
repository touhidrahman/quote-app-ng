import { HttpClientModule } from '@angular/common/http'
import { enableProdMode, importProvidersFrom } from '@angular/core'
import { bootstrapApplication } from '@angular/platform-browser'
import { RouterModule, TitleStrategy } from '@angular/router'
import { APP_CONFIG } from '@core/config/app-config'
import { CustomTitleStrategy } from '@core/config/app-title'
import { routes } from './app/app-routing.module'
import { AppComponent } from './app/app.component'
import { environment } from './environments/environment'

if (environment.production) {
    enableProdMode()
}

bootstrapApplication(AppComponent, {
    providers: [
        { provide: APP_CONFIG, useValue: environment },
        importProvidersFrom(HttpClientModule),
        importProvidersFrom(RouterModule.forRoot(routes)),
        { provide: TitleStrategy, useClass: CustomTitleStrategy },
    ],
}).catch((err) => console.error(err))
