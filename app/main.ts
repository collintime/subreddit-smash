import {bootstrap}    from 'angular2/platform/browser'
import {AppComponent} from './app.component'
import {HTTP_PROVIDERS} from 'angular2/http';
import {BackgroundsService} from './backgrounds.service';
import {CaptionsService} from './captions.service';


bootstrap(AppComponent, [HTTP_PROVIDERS, BackgroundsService, CaptionsService]);
