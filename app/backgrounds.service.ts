import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class BackgroundsService {

    backgrounds$: Observable<Array<any>>;

    private _backgroundsObserver: any;
    private _dataStore: {
        backgrounds: Array<any>
    }

    constructor(private _http: Http) {

        this.backgrounds$ = new Observable(observer =>
            this._backgroundsObserver = observer).share();

        this._dataStore = {
            backgrounds: []
        }
    }

    imageFilter(image) {
        return true;//image.source.height < 1300 && image.source.width > 900;
    }

    loadBackgrounds(subreddit) {

        this._http.get(`https://www.reddit.com/r/${subreddit}/.json`)
            .map(res => res.json().data.children)
            .subscribe(images => {
                
                console.log(images);

                this._dataStore.backgrounds = images
                    .map(post => post.data.preview.images[0])
                    .filter(this.imageFilter);
                    
                this._backgroundsObserver.next(this._dataStore.backgrounds);
            
        }, error => {
                
                console.log(error);
                console.log('could not load backgrounds')
            });
    }
}