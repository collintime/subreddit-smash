import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {SmashComponent} from './smash.component';
import {BackgroundsService} from './backgrounds.service';
import {CaptionsService} from './captions.service';

@Component({
    selector: 'my-app',
    directives: [ROUTER_DIRECTIVES],
    template: `
        <h1>{{title}}</h1>
        <router-outlet></router-outlet>
    `,
    providers: [
        ROUTER_PROVIDERS,
        BackgroundsService,
        CaptionsService
    ]
})

@RouteConfig([
    {
        path: '/smash',
        name: 'Smash',
        component: SmashComponent,
        useAsDefault: true
    }
])

export class AppComponent {
    title = 'Subreddit Smash';
}